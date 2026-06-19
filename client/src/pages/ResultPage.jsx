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
        <Container className="result-container">
            <Card className="text-center border-0">
                <Card.Title className='fs-2 mb-3 fw-bold'>
                    Score: {props.coins} points!
                </Card.Title>
            </Card>
            
            <Button onClick={() => navigate("/best-scores")}>
                Best Scores
            </Button>
        </Container>
        </>
    )
}

export default ResultPage