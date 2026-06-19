import { Navbar, Container, Button } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate, Link, useLocation } from 'react-router';
import GameTimer from './GameTimer'
import { GamePhases } from '../models/gamePhases';
import '../styles/Header.css'

/**
 * Header component.
 * Contains:
 * - Application title: Last Race
 * - Play/Play Again button: visible only to logged in users and enabled only in non-playing mode
 * - Countdown timer: visible to logged in users in playing mode
 * - Best Scores button: visible only to logged in users and disabled in playing mode
 * - User icon and Logout link
 * @param {*} props 
 */
function Header(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const isLoggedIn = props.user.id !== undefined
    const isIdle = props.gamePhase === GamePhases.SETUP || props.gamePhase === GamePhases.RESULT

    return(
        <>
            <Navbar className='navbar'>
                <Container fluid className='header-inner'>
                    <div className='header-brand'>
                        <Navbar.Brand className='navbar-title'> Last Race </Navbar.Brand>
                    </div>

                    <div className='header-actions header-actions-center'>
                        {isLoggedIn && location.pathname !== '/best-scores' && isIdle
                        && <Button
                                className='header-button header-button-primary'
                                onClick={() => {
                                    if (props.gamePhase === GamePhases.SETUP) props.startPlanningPhase()
                                    else if (props.gamePhase === GamePhases.RESULT) props.playAgain()
                        }}>
                            {props.gamePhase === GamePhases.SETUP ? "Play" : "Play Again"}
                        </Button>}
                        {props.gamePhase === GamePhases.PLANNING
                        && <GameTimer onTimeUp={props.startExecutionPhase} gamePhase={props.gamePhase}/>}
                    </div>

                    <div className='header-actions header-actions-end'>
                        {isLoggedIn
                        && <Button className='header-button header-button-secondary' onClick={() => navigate("/best-scores")} disabled={!isIdle}> 
                            Best Scores 
                        </Button>}

                        {isLoggedIn && <span className='header-user'>
                            <PersonFill className='header-user-icon'/>
                            <Link className='header-logout-link' to='/logout'>Logout</Link>
                        </span>}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header