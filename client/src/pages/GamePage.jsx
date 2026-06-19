import { useContext, useState } from "react"
import { useNavigate, Navigate } from "react-router"
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
  if (user.id == undefined) return <Navigate to={"/"} />;

  // States
  const [startStation, setStartStation] = useState({ id: null, name: null });
  const [endStation, setEndStation] = useState({ id: null, name: null });
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [events, setEvents] = useState([]);
  const [isValidated, setIsValidated] = useState(false);

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
      <Container fluid className="game-container">
        <Row>
          <Col>
            <StartEndStations
              startStation={startStation}
              endStation={endStation}
              gamePhase={props.gamePhase}
            />
          </Col>

          <Col>
            {/* Show the button to submit the route when in Planning Phase */}
            {props.gamePhase === GamePhases.PLANNING && (
              <Button onClick={() => { props.startExecutionPhase() }}>
                Submit Route
              </Button>
            )}
          </Col>

          <Col>
            <CoinsDisplayer coins = {props.coins}/>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
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
              <h3 className="mt-4 text-center text-primary">
                Validating route and fetching events...
              </h3>
            )}

            {/* Show the Network map component when in Setup or Planning phase */}
            {(props.gamePhase === GamePhases.SETUP ||
              props.gamePhase === GamePhases.PLANNING) && (
              <NetworkMap gamePhase={props.gamePhase} />
            )}
          </Col>

          <Col xs={4}>
            <SegmentList
              segments={segments}
              gamePhase={props.gamePhase}
              selectedSegments={selectedSegments}
              setSelectedSegments={setSelectedSegments}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GamePage