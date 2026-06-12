import { Container } from 'react-bootstrap';
import { GamePhases } from '../models/gamePhases';
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
                {props.gamePhase != GamePhases.SETUP && <>
                    <span className='fs-3'>{props.startStation.name}</span>
                    <i className="bi bi-arrow-right fs-3"></i>
                    <span className='fs-3'>{props.endStation.name}</span></>
                }
            </Container>
        </>
    )
}

export default StartEndStations