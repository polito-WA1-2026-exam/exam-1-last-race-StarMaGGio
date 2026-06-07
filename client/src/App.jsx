import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NetworkMap from './components/NetworkMap'
import SegmentList from './components/SegmentList'
import StartEndStations from './components/StartEndStations'
import bgImg from './assets/Background_image_example.png'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Routes, Route, Outlet, useNavigate } from 'react-router'
import { useState } from 'react'

function App() {
  const navigate = useNavigate()

  const [user, setUser] = useState({id: undefined, username: undefined})

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
   * Main App component
   */
  return (
    <div style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
    }}>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<LoginPage doLogin={doLogin}/>}/>
          <Route path="last-race" element={<GamePage/>}/>
          <Route path="game-instructions" element={<GameInstructionsPage/>}/>
          <Route path="best-scores" element={<BestScoresPage/>}/>
        </Route>
      </Routes>
    </div>
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
      <Header/>
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
  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center border" >
        <LoginForm doLogin={props.doLogin}/>
        <Button className="mt-3"> How to Play </Button>
      </Container>
    </>
  )
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
  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center border" >
        <span>Game Instructions bla bla bla ...</span>
        <Button className="mt-3"> Back to Login </Button>
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
  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center border" >
        <span>Best Scores Table bla bla bla ...</span>
        <Button className="mt-3"> Back to the Game </Button>
      </Container>
    </>
  )
}
 