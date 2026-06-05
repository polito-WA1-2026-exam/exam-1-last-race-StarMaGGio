import { Container } from 'react-bootstrap';
import '../styles/StartEndStations.css';

/**
 * Component that shows the start and end stations of the path that the player has to reconstruct during the game
 * @param {*} props 
 * @returns Nothing if the game is in Setup phase.
 *          The start and end stations of the path that the player has to reconstruct during the game if the game is in Planning or Execution phase.
 */
function StartEndStations(props) {
    return (
        <>
            <Container className='start-end-stations-container'>
                Here there should be the start and end stations of the path that the player has to reconstruct during the game
            </Container>
        </>
    )
}

export default StartEndStations