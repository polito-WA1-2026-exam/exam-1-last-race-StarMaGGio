import Header from "../components/Header"
import { Outlet } from "react-router"

/**
 * Main layout component for the application
 * Contains the header and the Outlet filled by the subroutes
 * @param {{user, startPlanningPhase, startExecutionPhase, playAgain}} props
 */
function MainLayout(props) {
  return (
    <>
      <Header
        user={props.user}
        gamePhase={props.gamePhase}
        startPlanningPhase={props.startPlanningPhase}
        startExecutionPhase={props.startExecutionPhase}
        playAgain={props.playAgain}
      />
      <Outlet />
    </>
  );
}

export default MainLayout