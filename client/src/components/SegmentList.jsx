import { Container } from 'react-bootstrap';
import { GamePhases } from '../models/gamePhases';
import '../styles/SegmentList.css';

/**
 * Component that shows the list of segments that the player can chose to reconstruct the path during the game
 * @param {*} props 
 * @returns Nothing if the game is in Setup phase.
 *          The list of segments that the player can chose to reconstruct the path during the game if the game is in Planning or Execution phase.
 */
function SegmentList(props) {
    return(
        <>
            <Container className='segment-list-container'>
                {props.gamePhase !== GamePhases.SETUP && props.segments.map((s) => (
                    <Segment nameS1={s.nameS1} nameS2={s.nameS2} lineColor={s.lineColor}/>
                ))}
            </Container>
        </>
    )
}

function Segment(props) {
    return (
        <>
            <Container className='segment-container' style={{ '--segment-border-color': props.lineColor }}>
                <span className='fs-3'>{props.nameS1}</span>
                <i class="bi bi-arrow-left-right fs-3"></i>
                <span className='fs-3'>{props.nameS2}</span>
            </Container>
        </>
    )
}

export default SegmentList;