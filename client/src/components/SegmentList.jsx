import { Container } from 'react-bootstrap';
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
                Here there should be the list of segments that the player can chose to reconstruct the path during the game
            </Container>
        </>
    )
}
export default SegmentList;