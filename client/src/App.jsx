import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NetworkMap from './components/NetworkMap'
import SegmentList from './components/SegmentList'
import StartEndStations from './components/StartEndStations'
import ScoresTable from './components/ScoresTable'
import bgImg from './assets/Login background.png'
import UserContext from './contexts/UserContext.js'
import { GamePhases } from './models/gamePhases.js'
import './styles/GamePage.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Routes, Route, Outlet, useNavigate, Navigate } from 'react-router'
import { useState, useContext, useEffect } from 'react'
import { checkSession, logout } from './api/auth.js'
import { getSegments, getRandomStartEndStations } from './api/network.js'

function App() {
  const navigate = useNavigate()

  /**
   * States
   */
  const [user, setUser] = useState({id: undefined, username: undefined})
  const [coins, setCoins] = useState(20)
  const [gamePhase, setGamePhase] = useState(GamePhases.SETUP)

  /**
   * Try to restore the login session on page reload
   */
  useEffect(() => { checkSession().then(res => { setUser({id: res.id, username: res.username}) }) }, [])

  /**
   * Function to handle the log in in the client.
   * Set the current user and redirect to the main page.
   * @param {*} user 
   */
  const doLogin = (user) => {
    setUser({id: user.id, username: user.username})
    navigate("/last-race")
  }

  /**
   * Function to handle the log out in the client.
   * Set the current user to undefined and redirect to the login page.
   */
  const doLogout = () => {
    setUser({id: undefined, username: undefined})
    navigate("/")
  }

  /**
   * Function that set the game phase to PLANNING
   * starts a timeout of 90 seconds ...
   */
  const startPlanningPhase = () => {
    setGamePhase(GamePhases.PLANNING)

    setTimeout(() => {
      setGamePhase(GamePhases.RESULT)
    }, 3000) // For now is 3 seconds for debug
  }
  
  const playAgain = () => {
    setGamePhase(GamePhases.SETUP)

    // Do other things like restore coins ecc...
  }

  /**
   * Main App component
   */
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<MainLayout user={user} gamePhase={gamePhase} startPlanningPhase={startPlanningPhase} playAgain={playAgain}/>}>
          <Route index element={<LoginPage doLogin={doLogin}/>}/>
          <Route path="last-race" element={<GamePage coins={coins} gamePhase={gamePhase}/>}/>
          <Route path="game-instructions" element={<GameInstructionsPage/>}/>
          <Route path="best-scores" element={<BestScoresPage/>}/>
          <Route path="logout" element={<LogoutPage doLogout={doLogout} />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App

/**
 * Main layout component for the application
 * Contains the header and the Outlet filled by the subroutes
 * @param {*} props 
 */
function MainLayout(props) {
  return (
    <>
      <Header user={props.user}
              gamePhase={props.gamePhase}
              startPlanningPhase={props.startPlanningPhase}
              playAgain={props.playAgain}/>
      <Outlet/>
    </>
  )
}

/**
 * Login Page component for the application
 * @param {*} props 
 * @returns The LoginForm if the user is not logged in, otherwise redirects to the main page
 */
function LoginPage(props) {
  const navigate = useNavigate()

  const user = useContext(UserContext)
  if (user.id !== undefined) return <Navigate to={"/last-race"}/>

  return (
    <>
      <div style={{ // TODO: make it a react component
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}>
        <Container fluid className="d-flex flex-column align-items-center justify-content-center" >
          <LoginForm doLogin={props.doLogin}/>
          <Button className="mt-3" onClick={() => navigate("/game-instructions")}> How to Play </Button>
        </Container>
      </div>
    </>
  )
}

/**
 * Logout Page component for the application
 * Execute the logout API and the logout function in the client
 * @param {*} props 
 */
function LogoutPage(props) {
  useEffect(() => { logout().then(() => { props.doLogout() }) }, [])
  return "Logging out"
}

/**
 * Game Page component for the application
 * Contains the game components:
 * - Start-End Stations
 * - Coins of the player
 * - Network Map
 * - Segment List
 * @param {*} props 
 */
function GamePage(props) {
  const user = useContext(UserContext)
  if (user.id == undefined) return <Navigate to={"/"}/>

  const [startStation, setStartStation] = useState({id: null, name: null})
  const [endStation, setEndStation] = useState({id: null, name: null})
  const [segments, setSegments] = useState([])

  // Fetch segments at page load
  useEffect(() => { getSegments().then((res) => setSegments(res))}, [])

  // Fetch random start-end stations when gamePhase switch to PLANNING
  useEffect(() => {
    if (props.gamePhase === GamePhases.PLANNING) {
      getRandomStartEndStations().then((res) => {
        setStartStation(res.startStation)
        setEndStation(res.endStation)
      })
    }
  }, [props.gamePhase])
  
  return (
    <>
      <Container fluid className="game-container">
        <Row>
          <Col>
            <StartEndStations startStation={startStation}
                              endStation={endStation}
                              gamePhase={props.gamePhase}/>
          </Col>
          <Col>
            {/* TODO: transform coins displayer in a component */}
            <Container className='d-flex flex-row' style={{background: "#fef8ee", border: "1px solid #c0c0c0", borderRadius: "15px", width: "7vw", "justify-content": "center"}}>
              <span className='fs-2 me-2'>{props.coins}</span>
              <i class="bi bi-coin fs-2"></i>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <NetworkMap gamePhase={props.gamePhase}/>
          </Col>
          <Col xs={4}>
            <SegmentList segments={segments} gamePhase={props.gamePhase}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

/**
 * Game Instructions Page component for the application
 * Contains the instructions for the game and a button to go back to the login page
 * @param {*} props 
 */
function GameInstructionsPage(props) {
  const navigate = useNavigate()

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" >
        <span>Game Instructions bla bla bla ...</span>
        <Button className="mt-3" onClick={() => navigate("/")}> Back to Login </Button>
      </Container>
    </>
  )
}

/**
 * Best Scores Page component for the application
 * Contains a table with players best scores and a button to go back to the main page
 * @param {*} props
 */
function BestScoresPage(props) {
  const navigate = useNavigate()

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" >
        <ScoresTable/>
        <Button className="mt-3" onClick={() => navigate("/last-race")}> Back to the Game </Button>
      </Container>
    </>
  )
}
 