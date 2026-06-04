import { Navbar, Container } from 'react-bootstrap'
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
                <Container>
                    <Navbar.Brand className='navbar-title'>Last Race</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header