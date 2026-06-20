import React from "react"
import { useNavigate } from "react-router"
import { Container, Button, Card } from "react-bootstrap"
import ScoresTable from "../components/ScoresTable"
import "../styles/BestScoresPage.css"

/**
 * Best Scores Page component for the application
 * Contains a table with players best scores and a button to go back to the main page
 * @param {{backToGame}} props
 */
function BestScoresPage(props) {
  const navigate = useNavigate()

  return (
    <>
        <Container fluid className="best-scores-page">
            <div className="best-scores-shell">
                <div className="best-scores-hero">
                    <p className="best-scores-kicker">Leaderboard</p>
                    <h1 className="best-scores-title">Best Scores</h1>
                    <p className="best-scores-subtitle">Check the current ranking of the players</p>
                </div>

                <Card className="best-scores-card border-0 shadow-sm">
                    <Card.Body className="best-scores-card-body">
                        <ScoresTable />
                    </Card.Body>
                </Card>
                

                <Button 
                    className="back-to-game-button"
                    onClick={() => {
                        props.backToGame()
                        navigate("/last-race")
                    }}>
                    Back to the Game
                </Button>
            </div>
        </Container>
    </>
  )
}

export default BestScoresPage