import { useState, useEffect } from "react";
import { GamePhases } from "../models/gamePhases";

function GameTimer(props) {
    const [seconds, setSeconds] = useState(null);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (props.gamePhase === GamePhases.PLANNING) {
            setSeconds(90)
            setIsActive(true)
        }
    }, [props.gamePhase])

    useEffect(() => {
        let interval = null;

        // If the timer is active and the there are still remaining seconds
        // -> set an interval that after 1 seconds decrease the remaining seconds by 1
        if (isActive && seconds > 0) 
            interval = setInterval(() => { setSeconds((prevSeconds) => prevSeconds - 1) }, 1000)
        
        // When seconds reach 0 -> clear interval, disable timer and call onTimeUp function
        else if (isActive && seconds === 0) {
            clearInterval(interval)
            setIsActive(false)

            if (props.onTimeUp) props.onTimeUp()
        }

        // Disable and destroy the timer if the component is unloaded before interval end
        return () => {
            clearInterval(interval)
        }
    }, [isActive, seconds, props.onTimeUp])

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <div className="fs-1 fw-bold text-primary mb-3">
                    {seconds}
                </div>
            </div>
        </>
    )
}

export default GameTimer