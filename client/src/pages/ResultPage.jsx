import { useNavigate } from "react-router"
import { Button, Card, Container } from "react-bootstrap"

/**
 * Result Page component for the application
 * @param {*} props 
 */
function ResultPage(props) {
    const navigate = useNavigate()
    
    return (
        <>
        <Container fluid className="result-page">
            <div className="result-shell">
                <div className="result-hero">
                    <p className="result-kicker">Jurney Complete</p>
                    <h1 className="result-title">Your Final Score is...</h1>
                </div>

                <Card className="result-card border-0">
                    <Card.Body className='result-card-body'>
                        <div className="result-score-display">
                            <div className="result-score-value">{props.coins}</div>
                            <div className="result-score-label">points!</div>
                        </div>
                    </Card.Body>
                </Card>
                
                <Button 
                    className="result-button"
                    onClick={() => navigate("/best-scores")}>
                    View Leaderboard
                </Button>
            </div>
        </Container>
        </>
    )
}

export default ResultPage