import { Container, Button } from "react-bootstrap"
import { useNavigate, Navigate } from "react-router"
import { useContext } from "react"

import LoginForm from "../components/LoginForm"
import UserContext from "../contexts/UserContext.js"
import "../styles/LoginPage.css"

/**
 * Login Page component for the application.
 * Contains the login form and a button to navigate to the game instructions page
 * @param {{doLogin}} props
 * @returns The LoginForm if the user is not logged in, otherwise redirects to the main page
 */
function LoginPage(props) {
  const navigate = useNavigate()

  const user = useContext(UserContext)
  if (user.id !== undefined) return <Navigate to={"/last-race"} />

  return (
    <>
      <div className="login-page">
        <div className="login-page-overlay"/>
          <Container fluid className="login-page-content">
            <div className="login-page-hero">
              <h1 className="login-page-title">Last Race</h1>
              <p className="login-page-subtitle">Organize your jurney, plan your race and keep everything under control.</p>
            </div>
            <LoginForm doLogin={props.doLogin} />
            <Button className="how-to-play-button" onClick={() => navigate("/game-instructions")}>
              How to Play
            </Button>
          </Container>
      </div>
    </>
  )
}

export default LoginPage