import express from "express"
import morgan from "morgan"
import cors from "cors"
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session"
import { getUser } from "./dao.js"

const PREFIX = "/api/v1"
const SECRET_PHRASE = "Santa Claus does not exists"

const NOT_AUTHORIZED_MSG = "Not authorized!"
const NOT_AUTHENTICATED_MSG = "Not authenticated!"

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

/* --- SERVER STARTUP --- */

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})