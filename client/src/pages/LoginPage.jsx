import { Container, Button } from "react-bootstrap"
import { useNavigate, Navigate } from "react-router"
import { useContext } from "react"

import LoginForm from "../components/LoginForm"
import UserContext from "../contexts/UserContext.js"

import bgImg from "../assets/Login background.png"
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
      <div className="login-background" style={{ backgroundImage: `url(${bgImg})` }}>
        <Container fluid className="d-flex flex-column align-items-center justify-content-center">
          <LoginForm doLogin={props.doLogin} />
          <Button className="mt-3" onClick={() => navigate("/game-instructions")}>
            How to Play
          </Button>
        </Container>
      </div>
    </>
  )
}

export default LoginPage