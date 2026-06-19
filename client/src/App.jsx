import "./App.css"
import "./styles/ResultPage.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import UserContext from "./contexts/UserContext.js"
import { GamePhases } from "./models/GamePhases.js"
import useRestoreSession from "./hooks/useRestoreSession.js"

import MainLayout from "./pages/MainLayout.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import GamePage from "./pages/GamePage.jsx"
import LogoutPage from "./pages/LogoutPage.jsx"
import ResultPage from "./pages/ResultPage.jsx"
import GameInstructionsPage from "./pages/GameInstructionsPage.jsx"
import BestScoresPage from "./pages/BestScoresPage.jsx"

import { Button, Container, Row, Col, Card } from "react-bootstrap"
import { Routes, Route, useNavigate } from "react-router"
import { useState } from "react"

import { saveScoreToBackend } from "./api/scores.js"

function App() {
  const navigate = useNavigate()

  /**
   * --- States ---
   */
  const [user, setUser] = useState({ id: undefined, username: undefined })
  const [coins, setCoins] = useState(20)
  const [gamePhase, setGamePhase] = useState(GamePhases.SETUP)

  // Custom hook
  useRestoreSession(setUser)

  /**
   * --- Functions to manage user login, logout and session ---
   */

  /**
   * Function to handle the log in in the client.
   * Set the current user and redirect to the main page.
   * @param {*} user
   */
  const doLogin = (user) => {
    setUser({ id: user.id, username: user.username })
    navigate("/last-race")
  }

  /**
   * Function to handle the log out in the client.
   * Set the current user to undefined and redirect to the login page.
   */
  const doLogout = () => {
    setUser({ id: undefined, username: undefined })
    navigate("/")
  }

  /* --- Functions to move between game phases ---
   *   Setup -> Planning -> Execution -> Result
   */
  const startPlanningPhase = () => {
    setGamePhase(GamePhases.PLANNING)
  }

  const startExecutionPhase = () => {
    setGamePhase(GamePhases.EXECUTION)
  }

  const showResult = () => {
    setGamePhase(GamePhases.RESULT)
    
    if (coins < 0) setCoins(0)

    saveScoreToBackend(coins)
    navigate("/result")
  }

  const playAgain = () => {
    setGamePhase(GamePhases.SETUP)
    setCoins(20)
    navigate("/last-race")
  }
  
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              user={user}
              gamePhase={gamePhase}
              startPlanningPhase={startPlanningPhase}
              startExecutionPhase={startExecutionPhase}
              playAgain={playAgain}
            />
          }
        >
          <Route index element={<LoginPage doLogin={doLogin} />} />
          <Route
            path="last-race"
            element={
              <GamePage
                coins={coins}
                setCoins={setCoins}
                gamePhase={gamePhase}
                startExecutionPhase={startExecutionPhase}
                showResult={showResult}
              />
            }
          />
          <Route path="result" element={<ResultPage coins={coins}/>} />
          <Route path="game-instructions" element={<GameInstructionsPage/>} />
          <Route path="best-scores" element={<BestScoresPage backToGame={playAgain}/>} />
          <Route path="logout" element={<LogoutPage doLogout={doLogout} />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App