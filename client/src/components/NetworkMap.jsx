import { Container } from 'react-bootstrap'
import '../styles/NetworkMap.css'
import mapWithSegments from '../assets/Network Map with segments.png'
import mapWithoutSegments from '../assets/Network Map without segments.png'
import { GamePhases } from '../models/gamePhases'

/**
 * Component to display the network map.
 * @param {*} props 
 * @returns The network map with stations and segments if the game is in Setup phase.
 *          The network map with only stations if the game is in Planning or Execution phase.
 */
function NetworkMap(props) {
    return(
        <>
            <Container className='network-map-container'>
                {props.gamePhase == GamePhases.SETUP && <img src={mapWithSegments} alt="Network Map" className='network-map'/>}
                {props.gamePhase == GamePhases.PLANNING && <img src={mapWithoutSegments} alt="Network Map" className='network-map'/>}
            </Container>
        </>
    )
}

export default NetworkMap