import { Navbar, Container, Button } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate, Link } from 'react-router';
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

    return(
        <>
            <Navbar className='glass-navbar'>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='navbar-title'> Last Race </Navbar.Brand>
                    </div>
                    <div>
                        {props.user.id !== undefined && <Button> Play </Button>}
                    </div>
                    <div>
                        {props.user.id !== undefined && <Button onClick={() => navigate("/best-scores")}> Best Scores </Button>}
                        {props.user.id !== undefined && <span>
                                <PersonFill size={24} className="ms-2" />
                                <Link to='/logout'>Logout</Link>
                        </span>}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header