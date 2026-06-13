import express from "express"
import morgan from "morgan"
import cors from "cors"
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session"
import { getUser, getBestScores, getSegments, getStations, getSegmentsStationIds } from "./dao.js"
import { NetworkMap } from "./models/NetworkMap.js"

const PREFIX = "/api/v1"
const SECRET_PHRASE = "Santa Claus does not exists"

const NOT_AUTHORIZED_MSG = "Not authorized!"
const NOT_AUTHENTICATED_MSG = "Not authenticated!"

function internalError(res) {
    return err => res.status(500).json({"error": err.message})
}

/* --- OBJECTS AND FUNCTIONS --- */
// Initialize network map in the backend from the database
const stationsData = await getStations()
const segmentsData = await getSegmentsStationIds()
const networkMap = new NetworkMap(stationsData, segmentsData)

/**
 * Function to validate the route sent by the frontend.
 * It construct a route-graph exclusively with segments sent by the frontend,
 * then explores it with BFS algorithm from the startStation to check if
 * the route reach the endStation
 * @param {int} startStationId 
 * @param {int} endStationId 
 * @param {*} selectedSegments Array of stationIds pairs (idS1, idS2)
 * @returns an object with: isValid= bool, reason= string, numSegments= int/undefined
 */
function validatePlayerRoute(startStationId, endStationId, selectedSegments) {
  const routeGraph = {}

  // 1. Build the route graph
  for (const segment of selectedSegments) {
    const nodeA = segment.idS1
    const nodeB = segment.idS2

    // Add the node to the graph if not already present and initialize an empty list of adiacent stations
    if (!routeGraph[nodeA]) routeGraph[nodeA] = []
    if (!routeGraph[nodeB]) routeGraph[nodeB] = []

    // Add the connection in both directions
    routeGraph[nodeA].push(nodeB)
    routeGraph[nodeB].push(nodeA)
  }

  // 2. Preliminary validations
  if(!routeGraph[startStationId] || !routeGraph[endStationId]) {
    return {
      isValid: false,
      reason: "Start Station and/or End Station are not in the submitted route!"
    }
  }

  // 3. BFS algorithm to explore the route graph
  const visited = new Set()
  const queue = [startStationId]
  visited.add(startStationId)

  let reachedEndStation = false;

  while (queue.length > 0) {
    // Take the head element of the queue
    const currentNodeId = queue.shift()

    if (currentNodeId === endStationId) {
      reachedEndStation = true
      // NO break here -> finish visit all the graph to anti-cheat check later
    }

    // Add current station neighbors to the queue (if they have not been already visited)
    const neighborIds = routeGraph[currentNodeId] || []
    for (const neighborId of neighborIds) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId)
        queue.push(neighborId)
      }
    }
  }

  // 4. Return if endStation is not reached
  if (!reachedEndStation) {
    return {
      isValid: false,
      reason: "Destination not reached!"
    }
  }

  // 5. Anti-cheat check
  // Check if there are extra segments in the submitted route
  // by checking if in the route graph there are nodes that have not been visited by the BFS.
  for (const node in routeGraph) {
    if (!visited.has(Number(node))) {
      return {
        isValid: false,
        reason: "Extra segments have been selected!"
      }
    }
  }

  // 6. All validations have passed
  return {
    isValid: true,
    reason: "The route successfully reach the destination!",
    numSegments: selectedSegments.length
  }
}

/* --- SERVER INITIALIZATION AND CONFIGURATION --- */

// Express configuration
const app = new express()
app.use(express.json())
const port = 3001;

// Morgan configuration
const log = morgan('dev')
app.use(log)

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true
}
app.use(cors(corsOptions))

// Passport and session configuration
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password)

  if (!user) return cb(null, false, "Incorrect username or password!")
  // else
  return cb(null, user)
}))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (user, cb) {
  return cb(null, user)
})

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next()
  // else
  console.log(req.user)
  return res.status(401).json({error: NOT_AUTHORIZED_MSG})
}

app.use(session({
  secret: SECRET_PHRASE,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.authenticate("session"))

/* --- ROUTES --- */

/* - Login and session */
// POST /auth/login
app.post(PREFIX + "/auth/login", passport.authenticate("local"), (req, res) => {
  return res.status(201).json(req.user)
})

// GET /sessions/current
app.get(PREFIX + "/sessions/current", (req, res) => {
  if (req.isAuthenticated()) res.json(req.user)
  else res.status(401).json({error: NOT_AUTHENTICATED_MSG})
})

// DELETE /sessions/current
app.delete(PREFIX + "/sessions/current", (req, res) => {
  if (req.isAuthenticated()) req.logout(() => { res.end() })
})

app.use(isLoggedIn)

/* - Stations and Segments */
// GET /network/segments
app.get(PREFIX + "/network/segments", async (req, res) => {
  try {
    const segments = await getSegments()
    res.json(segments)
  } catch (err) {
    console.log(err)
    internalError(res)
  }
})

// GET /network/stations/random-start-end
app.get(PREFIX + "/network/stations/random-start-end", async (req, res) => {
  try {
    const station = networkMap.getRandomStartEndStations(4)
    res.json(station)
  } catch (err) {
    console.log(err)
    internalError(res)
  }
})

/* - Game - */
// POST /game/validate-path
app.post(PREFIX + "/game/validate-path", async (req, res) => {
  // TODO: maybe add body validation
  try {
    // Extract body data
    const { startStationId, endStationId, selectedSegments } = req.body;

    // Validate route
    const result = validatePlayerRoute(startStationId, endStationId, selectedSegments)

    // Response for the backend
    if (result.isValid) {
      // --- HERE take n random events to return to the frontend ---
      return res.status(200).json({
        success: true,
        message: result.reason,
        events: result.numSegments
      })
    } else {
      return res.status(200).json({
        success: false,
        message: result.reason
      })
    }
  } catch (err) {
    console.log(err)
    internalError(res)
  }
})

/* - Best Scores - */
// GET /scores/bests
app.get(PREFIX + "/scores/bests", async (req, res) => {
  try {
    const best_scores = await getBestScores()
    res.json(best_scores)
  } catch (err) {
    console.log(err)
    internalError(res)
  }
})

// POST /scores
// TODO ...

/* --- SERVER STARTUP --- */

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})