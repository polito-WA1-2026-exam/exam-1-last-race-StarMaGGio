import { useEffect } from "react"

import { GamePhases } from "../models/gamePhases.js"
import { getSegments, getRandomStartEndStations } from "../api/network.js"
import { sendRouteForValidation, getRandomEvent } from "../api/game.js"

/**
 * Custom hook to manage the game flow effects in the GamePage component
 * @param {*} props
 */
function useGameFlowEffects({ gamePhase, startStation, endStation, selectedSegments, setSegments, setStartStation, setEndStation, setEvents, setIsValidated }) {

    // Fetch segments at the beginning of the game
    useEffect(() => {
        getSegments().then((res) => setSegments(res))
    }, [setSegments])

    // Fetch random start and end stations at the beginning of the Planning phase
    useEffect(() => {
        if (gamePhase === GamePhases.PLANNING) {
        getRandomStartEndStations().then((res) => {
            setStartStation(res.startStation)
            setEndStation(res.endStation)
        })
        }
    }, [gamePhase, setStartStation, setEndStation])

    // Send the selected route for validation at the beginning of the Execution phase
    useEffect(() => {
        if (gamePhase === GamePhases.EXECUTION) {
        setIsValidated(false)
        sendRouteForValidation(startStation, endStation, selectedSegments).then(
            (res) => {
            if (res.success) {
                const promises = []
                for (let i = 0; i < res.events; i++) {
                promises.push(getRandomEvent())
                }
                Promise.all(promises).then((fetchedEvents) => {
                setEvents(fetchedEvents)
                setIsValidated(true)
                })
            } else {
                setEvents([res.event])
                setIsValidated(true)
            }
            },
        )
        } else {
        setIsValidated(false)
        }
    }, [
        gamePhase,
        startStation,
        endStation,
        selectedSegments,
        setEvents,
        setIsValidated,
    ])
}

export default useGameFlowEffects