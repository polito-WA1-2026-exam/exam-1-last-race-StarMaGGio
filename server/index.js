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

/* --- OBJECTS --- */
// Initialize network map in the backend from the database
const stationsData = await getStations()
const segmentsData = await getSegmentsStationIds()
const networkMap = new NetworkMap(stationsData, segmentsData)

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

/* -  - */

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