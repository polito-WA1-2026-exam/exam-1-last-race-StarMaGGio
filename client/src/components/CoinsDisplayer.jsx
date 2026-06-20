import { Container } from "react-bootstrap"
import "../styles/CoinsDisplayer.css"

/**
 * Component to display current coins of the player
 * @param {{coins}} props
 */
function CoinsDisplayer(props) {
    return (
        <Container className="coins-displayer">
            <div className="coins-displayer-value">
                <span className="coins-displayer-number">{props.coins}</span>
                <i className="bi bi-coin coins-displayer-icon"></i>
            </div>
        </Container>
    )
}

export default CoinsDisplayer