import React from 'react'
import { useNavigate } from 'react-router'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'

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
  )
}

export default GameInstructionsPage