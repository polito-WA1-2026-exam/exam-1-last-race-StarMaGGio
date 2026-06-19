import { Container } from "react-bootstrap"

/**
 * Component to display current coins of the player
 * @param {{coins}} props
 */
function CoinsDisplayer(props) {
    return (
        <Container className="d-flex flex-row"
              style={{
                background: "#fef8ee",
                border: "1px solid #c0c0c0",
                borderRadius: "15px",
                width: "7vw",
                "justify-content": "center",
        }}>
            <span className="fs-2 me-2">{props.coins}</span>
            <i className="bi bi-coin fs-2"></i>
        </Container>
    )
}

export default CoinsDisplayer