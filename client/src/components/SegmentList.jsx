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

    /**
     * Function to handle the selection/deselection of the segments in the list
     * @param {*} segment 
     */
    const onToggleSegment = (segment) => {
        props.setSelectedSegments((prevSelected) => {
            // Check if the selected segment was already in the selected list
            const isAlreadySelected = prevSelected.some(
                (s) => s.nameS1 === segment.nameS1 && s.nameS2 === segment.nameS2
            )

            if (isAlreadySelected) {
                // Remove selected segment from the list of selected segments
                return prevSelected.filter((s) => !(s.nameS1 === segment.nameS1 && s.nameS2 === segment.nameS2))
            } else {
                // Add the selected segment to the list of selected segments
                return [...prevSelected, segment]
            }
        })
    }

    return(
        <>
            <Container className='segment-list-container'>
                {props.gamePhase !== GamePhases.SETUP && props.segments.map((s) => {
                    
                    // Check if this segment is in the selected segments list
                    const isSelected = props.selectedSegments.some(
                        (selected) => selected.nameS1 === s.nameS1 && selected.nameS2 === s.nameS2
                    )

                    return <Segment 
                                key={`${s.nameS1}-${s.nameS2}`}
                                nameS1={s.nameS1} 
                                nameS2={s.nameS2} 
                                lineColor={s.lineColor}
                                isSelected={isSelected}
                                onToggle={() => onToggleSegment(s)}
                            />
                })}
            </Container>
        </>
    )
}

function Segment(props) {
    return (
        <>
            <Container 
                className={`segment-container ${props.isSelected ? 'segment-selected' : ''}`}
                style={{
                    '--segment-border-color': props.lineColor,
                    '--segment-opacity': props.isSelected ? 1 : 0.7,
                    '--segment-border-width': props.isSelected ? '3px' : '1px'
                    }}
                onClick={props.onToggle}
            >
                <span className='fs-3'>{props.nameS1}</span>
                <i class="bi bi-arrow-left-right fs-3"></i>
                <span className='fs-3'>{props.nameS2}</span>
            </Container>
        </>
    )
}

export default SegmentList;