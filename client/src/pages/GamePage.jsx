import { useContext, useState } from "react"
import { Navigate } from "react-router"
import { Container, Row, Col, Button } from "react-bootstrap"

import NetworkMap from "../components/NetworkMap"
import SegmentList from "../components/SegmentList"
import StartEndStations from "../components/StartEndStations"
import EventExecution from "../components/EventExecution"
import CoinsDisplayer from "../components/CoinsDisplayer.jsx"

import UserContext from "../contexts/UserContext.js"
import { GamePhases } from "../models/gamePhases.js"

import useGameFlowEffects from "../hooks/useGameFlowEffects.js"

import "../styles/GamePage.css"

/**
 * Game Page component for the application
 * Contains the game components:
 * - Start-End Stations
 * - Coins of the player
 * - Network Map
 * - Segment List
 * @param {{gamePhase, startExecutionPhase, coins, setCoins, showResult}} props
 */
function GamePage(props) {
  const user = useContext(UserContext);
  if (user.id == undefined) return <Navigate to={"/"} />

  // States
  const [startStation, setStartStation] = useState({ id: null, name: null })
  const [endStation, setEndStation] = useState({ id: null, name: null })
  const [segments, setSegments] = useState([])
  const [selectedSegments, setSelectedSegments] = useState([])
  const [events, setEvents] = useState([])
  const [isValidated, setIsValidated] = useState(false)

  // Custom hook for the game flow
  useGameFlowEffects({
    gamePhase: props.gamePhase,
    startStation,
    endStation,
    selectedSegments,
    setSegments,
    setStartStation,
    setEndStation,
    setEvents,
    setIsValidated,
  })

  return (
    <>
      <Container fluid className="game-page">
        <div className="game-page-shell">

          <Row className="game-page-status-row g-3 align-items-stretch">
            <Col lg={5} className="d-flex">
              <div className="game-page-panel game-page-panel-status w-100">
                <StartEndStations
                  startStation={startStation}
                  endStation={endStation}
                  gamePhase={props.gamePhase}
                />
              </div>
            </Col>

            <Col lg={3}>
              {/* Show the button to submit the route when in Planning Phase */}
              
              {props.gamePhase === GamePhases.PLANNING && (
                <div className="game-page-panel game-page-panel-action w-100">
                  <Button 
                    className="game-submit-button"
                    onClick={() => { props.startExecutionPhase() }}>
                    Submit Route
                  </Button>
                </div>
              )}
            </Col>

            <Col className="d-flex" lg={4}>
                <div className="game-page-panel game-page-panel-coins w-100">
                  <CoinsDisplayer coins={props.coins}/>
                </div>
            </Col>
          </Row>

          <Row className="game-page-main-row g-4 align-items-start">
            <Col lg={8} className="d-flex">
                <div className="game-page-panel game-page-panel-main w-100">
                {/* Show the component of the events execution when in Execution phase and the submitted route is validated */}
                {props.gamePhase === GamePhases.EXECUTION && isValidated && (
                  <EventExecution
                    setCoins={props.setCoins}
                    events={events}
                    showResult={props.showResult}
                  />
                )}
                {/* While validating show loading... */}
                {props.gamePhase === GamePhases.EXECUTION && !isValidated && (
                  <div className="game-page-loading-state">
                    Validating route and fetching events...
                  </div>
                )}

                {/* Show the Network map component when in Setup or Planning phase */}
                {(props.gamePhase === GamePhases.SETUP ||
                  props.gamePhase === GamePhases.PLANNING) && (
                  <NetworkMap gamePhase={props.gamePhase} />
                )}
              </div>
            </Col>

            <Col lg={4} className="d-flex">
              <div className="game-page-panel game-page-panel-side w-100">
                <SegmentList
                  segments={segments}
                  gamePhase={props.gamePhase}
                  selectedSegments={selectedSegments}
                  setSelectedSegments={setSelectedSegments}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default GamePage