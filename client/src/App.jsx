import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NetworkMap from './components/NetworkMap'
import SegmentList from './components/SegmentList'
import StartEndStations from './components/StartEndStations'
import ScoresTable from './components/ScoresTable'
import bgImg from './assets/Background_image_example.png'
import UserContext from './contexts/UserContext.js'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Routes, Route, Outlet, useNavigate, Navigate } from 'react-router'
import { useState, useContext, useEffect } from 'react'
import { checkSession, logout } from './api/auth.js'

function App() {
  const navigate = useNavigate()

  /**
   * States
   */
  const [user, setUser] = useState({id: undefined, username: undefined})

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
   * Main App component
   */
  return (
    <UserContext.Provider value={user}>
      <div style={{ // TODO: make it a react component
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/" element={<MainLayout user={user}/>}>
            <Route index element={<LoginPage doLogin={doLogin}/>}/>
            <Route path="last-race" element={<GamePage/>}/>
            <Route path="game-instructions" element={<GameInstructionsPage/>}/>
            <Route path="best-scores" element={<BestScoresPage/>}/>
            <Route path="logout" element={<LogoutPage doLogout={doLogout} />} />
          </Route>
        </Routes>
      </div>
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
      <Header user={props.user}/>
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
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" >
        <LoginForm doLogin={props.doLogin}/>
        <Button className="mt-3" onClick={() => navigate("/game-instructions")}> How to Play </Button>
      </Container>
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
  return (
    <>
      <Container fluid className="d-flex flex-column border" >
        <Row>
          <Col xs={11}>
            <StartEndStations/>
          </Col>
          <Col xs={1}>
            <span>Player Coins</span>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <NetworkMap/>
          </Col>
          <Col xs={4}>
            <SegmentList/>
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
      <Container fluid className="d-flex flex-column align-items-center justify-content-center border" >
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
      <Container fluid className="d-flex flex-column align-items-center justify-content-center border" >
        <ScoresTable/>
        <Button className="mt-3" onClick={() => navigate("/last-race")}> Back to the Game </Button>
      </Container>
    </>
  )
}
 