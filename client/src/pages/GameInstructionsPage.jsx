import React from 'react'
import { useNavigate } from 'react-router'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import "../styles/GameInstructionsPage.css"

/**
 * Game Instructions Page component for the application
 * Contains the instructions for the game and a button to go back to the login page
 * @param {*} props
 */
function GameInstructionsPage(props) {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className="instructions-page">
        <div className="instructions-shell">
          <div className="instructions-hero">
            <p className='instructions-kicker'>Game Instructions</p>
            <h1 className="instructions-title">How to Play</h1>
            <p className="instructions-subtitle">
              Your objective is to navigate the train network facing unexpected events
              and trying to save as many coins as possible. You start with <strong>20</strong> <i className="bi bi-coin"></i>
            </p>
          </div>

          <Card className="instruction-card border-0 overflow-hidden">
            <Row className="g-0 h-100">
              <Col md={2} className="instruction-icon-column instruction-icon-primary">
                <i className="bi bi-map instruction-icon"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="instruction-card-body">
                  <Card.Title className="instruction-card-title instruction-card-title-primary">
                    1. Setup Phase
                  </Card.Title>
                  <Card.Text className="instruction-card-text">
                    You will see the trains Network with stations, segments and line colors.
                    Take your time to memorize the map before starting your game.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="instruction-card instruction-card-warning border-0 overflow-hidden">
            <Row className="g-0 h-100">
              <Col md={2} className="instruction-icon-column instruction-icon-warning">
                <i className="bi bi-stopwatch instruction-icon"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="instruction-card-body">
                  <Card.Title className="instruction-card-title instruction-card-title-warning">
                    2. Planning Phase
                  </Card.Title>
                  <Card.Text className="instruction-card-text">
                    The server will assign you a <strong>Start Station</strong> and a <strong>End Station</strong>.
                    You will see only the stations on the map of the train Network! You have exactly <strong>90 seconds</strong> to 
                    scroll the segment list to reconstruct the route between the two assigned stations. When time ends,
                    the route will be submitted to the server for the validation.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="instruction-card instruction-card-danger border-0 overflow-hidden">
            <Row className="g-0 h-100">
              <Col md={2} className="instruction-icon-column instruction-icon-danger">
                <i className="bi bi-train-front instruction-icon"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="instruction-card-body">
                  <Card.Title className="instruction-card-title instruction-card-title-danger">
                    3. Execution Phase
                  </Card.Title>
                  <Card.Text className="instruction-card-text">
                    The server will validate the submitted route. If the route is wrong or incomplete, you will be lost and
                    <strong> you will loose all your coins</strong>!
                    If it is correct, the journey will begin: for each segment selected you will encounter a <strong>random event </strong>
                    that will affect in a positive of negative way your coins.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="instruction-card instruction-card-success border-0 overflow-hidden">
            <Row className="g-0 h-100">
              <Col md={2} className="instruction-icon-column instruction-icon-success">
                <i className="bi bi-trophy instruction-icon"></i>
              </Col>
              <Col md={10}>
                <Card.Body className="instruction-card-body">
                  <Card.Title className="instruction-card-title instruction-card-title-success">
                    4. Result Phase
                  </Card.Title>
                  <Card.Text className="instruction-card-text">
                    The jurney ends and your final score is shown, that will correspond to the remaining coins in
                    your wallet after the unexpected events. If you loose or your coins become negative, your final
                    score will be zero. Your best score will be shown in the Best Scores page!
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Button className="back-to-login-button" onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </div>
      </Container>
    </>
  )
}

export default GameInstructionsPage