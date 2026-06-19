import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import NetworkMap from "./components/NetworkMap";
import SegmentList from "./components/SegmentList";
import StartEndStations from "./components/StartEndStations";
import ScoresTable from "./components/ScoresTable";
import EventExecution from "./components/EventExecution";
import bgImg from "./assets/Login background.png";
import UserContext from "./contexts/UserContext.js";
import { GamePhases } from "./models/gamePhases.js";
import "./styles/GamePage.css";
import "./styles/ResultPage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Routes, Route, Outlet, useNavigate, Navigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { checkSession, logout } from "./api/auth.js";
import { getSegments, getRandomStartEndStations } from "./api/network.js";
import { sendRouteForValidation, getRandomEvent } from "./api/game.js";
import { saveScoreToBackend } from "./api/scores.js";

function App() {
  const navigate = useNavigate()

  /**
   * --- States ---
   */
  const [user, setUser] = useState({ id: undefined, username: undefined })
  const [coins, setCoins] = useState(20)
  const [gamePhase, setGamePhase] = useState(GamePhases.SETUP)

  /**
   * --- Functions to manage user login, logout and session ---
   */

  /**
   * Try to restore the login session on page reload
   */
  useEffect(() => {
    checkSession().then((res) => {
      setUser({ id: res.id, username: res.username })
    })
  }, [])

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

  /**
   * Main App component
   */
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

export default App;

/**
 * --- Pages (to be moved to relative files) ---
 */

/**
 * Main layout component for the application
 * Contains the header and the Outlet filled by the subroutes
 * @param {*} props
 */
function MainLayout(props) {
  return (
    <>
      <Header
        user={props.user}
        gamePhase={props.gamePhase}
        startPlanningPhase={props.startPlanningPhase}
        startExecutionPhase={props.startExecutionPhase}
        playAgain={props.playAgain}
      />
      <Outlet />
    </>
  );
}

/**
 * Login Page component for the application
 * @param {*} props
 * @returns The LoginForm if the user is not logged in, otherwise redirects to the main page
 */
function LoginPage(props) {
  const navigate = useNavigate();

  const user = useContext(UserContext);
  if (user.id !== undefined) return <Navigate to={"/last-race"} />;

  return (
    <>
      <div
        style={{
          // TODO: make it a react component
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <LoginForm doLogin={props.doLogin} />
          <Button
            className="mt-3"
            onClick={() => navigate("/game-instructions")}
          >
            {" "}
            How to Play{" "}
          </Button>
        </Container>
      </div>
    </>
  );
}

/**
 * Logout Page component for the application
 * Execute the logout API and the logout function in the client
 * @param {*} props
 */
function LogoutPage(props) {
  useEffect(() => {
    logout().then(() => {
      props.doLogout();
    });
  }, []);
  return "Logging out";
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
  const user = useContext(UserContext);
  if (user.id == undefined) return <Navigate to={"/"} />;

  const [startStation, setStartStation] = useState({ id: null, name: null });
  const [endStation, setEndStation] = useState({ id: null, name: null });
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [events, setEvents] = useState([]);
  const [isValidated, setIsValidated] = useState(false);

  // Fetch segments at page load
  useEffect(() => {
    getSegments().then((res) => setSegments(res));
  }, []);

  // Fetch random start-end stations when gamePhase switch to PLANNING
  useEffect(() => {
    if (props.gamePhase === GamePhases.PLANNING) {
      getRandomStartEndStations().then((res) => {
        setStartStation(res.startStation);
        setEndStation(res.endStation);
      });
    }
  }, [props.gamePhase]);

  // Execute the sendRouteForValidation API with the selected segments when gamePhase switch to EXECUTION
  useEffect(() => {
    if (props.gamePhase === GamePhases.EXECUTION) {
      setIsValidated(false);
      sendRouteForValidation(startStation, endStation, selectedSegments).then(
        (res) => {
          if (res.success) {
            // Fetch all events concurrently
            const promises = [];
            for (let i = 0; i < res.events; i++) {
              promises.push(getRandomEvent());
            }
            Promise.all(promises).then((fetchedEvents) => {
              setEvents(fetchedEvents);
              setIsValidated(true);
            });
          } else {
            setEvents([res.event]);
            setIsValidated(true);
          }
        },
      );
    } else {
      setIsValidated(false);
    }
  }, [props.gamePhase, startStation, endStation, selectedSegments]);

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
            {props.gamePhase === GamePhases.PLANNING && (
              <Button
                onClick={() => {
                  props.startExecutionPhase();
                }}
              >
                Submit Route
              </Button>
            )}
          </Col>
          <Col>
            {/* TODO: transform coins displayer in a component */}
            <Container
              className="d-flex flex-row"
              style={{
                background: "#fef8ee",
                border: "1px solid #c0c0c0",
                borderRadius: "15px",
                width: "7vw",
                "justify-content": "center",
              }}
            >
              <span className="fs-2 me-2">{props.coins}</span>
              <i className="bi bi-coin fs-2"></i>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            {props.gamePhase === GamePhases.EXECUTION && isValidated && (
              <EventExecution
                setCoins={props.setCoins}
                events={events}
                showResult={props.showResult}
              />
            )}
            {props.gamePhase === GamePhases.EXECUTION && !isValidated && (
              <h3 className="mt-4 text-center text-primary">
                Validating route and fetching events...
              </h3>
            )}
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
  );
}

function ResultPage(props) {
  const navigate = useNavigate()
  
  return (
    <>
      <Container className="result-container">
        <Card className="text-center border-0">
          <Card.Title className='fs-2 mb-3 fw-bold'>Score: {props.coins} points!</Card.Title>
        </Card>
        <Button onClick={() => navigate("/best-scores")}> Best Scores </Button>
      </Container>
    </>
  );
}

/**
 * Game Instructions Page component for the application
 * Contains the instructions for the game and a button to go back to the login page
 * @param {*} props
 */
function GameInstructionsPage(props) {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center">
        <Container className="py-5" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">How to Play</h1>
            <p className="lead text-muted">
              Your objective is to navigate the train network facing unexpected events
              and trying to save as many coins as possible. You start with <strong>20</strong> <i className="bi bi-coin"></i>
            </p>
          </div>

          <Card className="shadow-sm border-0 mb-4 rounnded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={2} className="bg-primary text-white d-flex align-items-center justify-content-center p-4">
                <i className="bi bi-map fs-1"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="p-4">
                  <Card.Title className="fs-3 fw-bold text-primary mb-3">
                    1. Setup Phase
                  </Card.Title>
                  <Card.Text className="fs-5 text-secondary">
                    You will see the trains Network with stations, segments and line colors.
                    Take your time to memorize the map before starting your game.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={2} className="bg-warning text-white d-flex align-items-center justify-content-center p-4">
                <i className="bi bi-stopwatch fs-1"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="p-4">
                  <Card.Title className="fs-3 fw-bold text-warning mb-3">
                    2. Planning Phase
                  </Card.Title>
                  <Card.Text className="fs-5 text-secondary">
                    The server will assign you a <strong>Start Station</strong> and a <strong>End Station</strong>.
                    You will see only the stations on the map of the train Network! You have exactly <strong>90 seconds</strong> to 
                    scroll the segment list to reconstruct the route between the two assigned stations. When time ends,
                    the route will be submitted to the server for the validation.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={2} className="bg-danger text-white d-flex align-items-center justify-content-center p-4">
                <i className="bi bi-train-front fs-1"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="p-4">
                  <Card.Title className="fs-3 fw-bold text-danger mb-3">
                    3. Execution Phase
                  </Card.Title>
                  <Card.Text className="fs-5 text-secondary">
                    The server will validate the submitted route. If the route is wrong or incomplete, you will be lost and
                    <strong> you will loose all your coins</strong>!
                    If it is correct, the journey will begin: for each segment selected you will encounter a <strong>random event </strong>
                    that will affect in a positive of negative way your coins.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={2} className="bg-success text-white d-flex align-items-center justify-content-center p-4">
                <i className="bi bi-trophy fs-1"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="p-4">
                  <Card.Title className="fs-3 fw-bold text-success mb-3">
                    4. Result Phase
                  </Card.Title>
                  <Card.Text className="fs-5 text-secondary">
                    The jurney ends and your final score is shown, that will correspond to the remaining coins in
                    your wallet after the unexpected events. If you loose or your coins become negative, your final
                    score will be zero. Your best score will be shown in the Best Scores page!
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>

        <Button className="mt-3 mb-3" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </Container>
    </>
  );
}

/**
 * Best Scores Page component for the application
 * Contains a table with players best scores and a button to go back to the main page
 * @param {*} props
 */
function BestScoresPage(props) {
  const navigate = useNavigate();

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <ScoresTable />
        <Button className="mt-3" onClick={() => {
            props.backToGame()
            navigate("/last-race")
        }}>
          Back to the Game
        </Button>
      </Container>
    </>
  );
}
