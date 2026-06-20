import Header from "../components/Header"
import { Outlet, useLocation } from "react-router"

import "../styles/LoginPage.css"

/**
 * Main layout component for the application
 * Contains the header and the Outlet filled by the subroutes
 * @param {{user, startPlanningPhase, startExecutionPhase, playAgain}} props
 */
function MainLayout(props) {
  const location = useLocation()
  const isLoginPage = location.pathname === "/"
  const isBestScoresPage = location.pathname === "/best-scores"
  const isResultPage = location.pathname === "/result"

  return (
    <div className={(isLoginPage || isBestScoresPage || isResultPage) ? "app-layout app-layout-bgimg" : "app-layout"}>
      <Header
        user={props.user}
        gamePhase={props.gamePhase}
        startPlanningPhase={props.startPlanningPhase}
        startExecutionPhase={props.startExecutionPhase}
        playAgain={props.playAgain}
      />
      <Outlet />
    </div>
  );
}

export default MainLayout