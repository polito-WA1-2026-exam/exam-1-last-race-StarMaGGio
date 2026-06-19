import React from "react"
import { useNavigate } from "react-router"
import { Container, Button } from "react-bootstrap"
import ScoresTable from "../components/ScoresTable"

/**
 * Best Scores Page component for the application
 * Contains a table with players best scores and a button to go back to the main page
 * @param {{backToGame}} props
 */
function BestScoresPage(props) {
  const navigate = useNavigate()

  return (
    <>
        <Container fluid className="d-flex flex-column align-items-center justify-content-center">
            <ScoresTable />
            <Button className="mt-3" onClick={() => {
                props.backToGame()
                navigate("/last-race")
            }}>
                Back to the Game
            </Button>
        </Container>
    </>
  )
}

export default BestScoresPage