import { Navbar, Container, Button } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons';
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
    return(
        <>
            <Navbar className='glass-navbar'>
                <Container fluid>
                    <div>
                        <Navbar.Brand className='navbar-title'> Last Race </Navbar.Brand>
                    </div>
                    <div>
                        <Button> Play </Button>
                    </div>
                    <div>
                        <Button> Best Scores </Button>
                        <PersonFill size={24} className="ms-2" />
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header