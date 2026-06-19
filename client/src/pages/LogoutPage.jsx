import { useEffect } from "react"
import { logout } from "../api/auth.js"

/**
 * Logout Page component for the application
 * Execute the logout API and the logout function in the client
 * @param {{doLogout}} props
 */
function LogoutPage(props) {

  useEffect(() => {
    logout().then(() => {
      props.doLogout()
    })
  }, [])

  return "Logging out"
}

export default LogoutPage