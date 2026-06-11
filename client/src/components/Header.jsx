import { Navbar, Container, Button } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate, Link, useLocation } from 'react-router';
import { GamePhases } from '../models/gamePhases';
import '../styles/Header.css'

/**
 * Header component.
 * Contains:
 * - Application title: Last Race
 * - Play/Play Again button: visible only to logged in users and enabled only in non-playing mode
 * - Countdown timer: visible to logged in users in playing mode
 * - Best Scores button: visible only to logged in users and disabled in playing mode
 * - User icon:
 * @param {*} props 
 */
function Header(props) {
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <>
            <Navbar className='glass-navbar'>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='navbar-title'> Last Race </Navbar.Brand>
                    </div>
                    <div>
                        {props.user.id !== undefined
                        && location.pathname !== '/best-scores'
                        && (props.gamePhase == GamePhases.SETUP || props.gamePhase == GamePhases.RESULT)
                        && <Button 
                                onClick={() => {
                                    if (props.gamePhase === GamePhases.SETUP) props.startPlanningPhase()
                                    else if (props.gamePhase === GamePhases.RESULT) props.playAgain()
                                }}
                            >
                                {props.gamePhase === GamePhases.SETUP ? "Play" : "Play Again"}
                            </Button>}
                    </div>
                    <div>
                        {props.user.id !== undefined && <Button 
                                                            onClick={() => navigate("/best-scores")}
                                                            disabled={props.gamePhase !== GamePhases.SETUP && props.gamePhase !== GamePhases.RESULT}
                                                        > 
                                                            Best Scores 
                                                        </Button>}

                        {props.user.id !== undefined && <span>
                                <PersonFill size={32} className="ms-2 me-1" />
                                <Link to='/logout'>Logout</Link>
                        </span>}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header