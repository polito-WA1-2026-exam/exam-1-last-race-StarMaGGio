import { Container } from 'react-bootstrap';
import '../styles/NetworkMap.css';

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
                Here there should be the network map
            </Container>
        </>
    )
}

export default NetworkMap