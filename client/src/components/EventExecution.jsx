import { useEffect, useState, useRef } from 'react'
import { Container, Card, ProgressBar } from 'react-bootstrap'
import "../styles/EventExecution.css"

const TIMER_SECONDS = 5

function EventExecution(props) {
    const [currentEventId, setCurrentEventId] = useState(0)
    const [seconds, setSeconds] = useState(TIMER_SECONDS)
    const appliedEvents = useRef(new Set())

    // Apply event modifier and reset the timer on current event change
    useEffect(() => {
        if (!props.events || props.events.length === 0) return

        // Prevent double application in React Strict Mode
        if (appliedEvents.current.has(currentEventId)) return
        appliedEvents.current.add(currentEventId)

        const currentEvent = props.events[currentEventId]
        props.setCoins((prevValue) => prevValue + Number(currentEvent.coin_modifier))
    }, [currentEventId, props.events, props.setCoins])

    // Timer between one event and the next one
    useEffect(() => {
        if (!props.events || props.events.length === 0) return

        if (seconds === 0) {
            if (currentEventId < props.events.length - 1) {
                setCurrentEventId(currentEventId + 1)
                setSeconds(TIMER_SECONDS)
            } else {
                props.showResult()
            }
            return
        }

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [seconds, currentEventId, props.events])

    const currentEvent = props.events[currentEventId]

    return (
        <>
            <Container className='event-exec-root'>
                <h2 className='event-exec-heading'>Events happened during the journey</h2>

                <Card className="event-exec-card">
                    <Card.Header className='event-exec-card-header'>
                        Event {currentEventId + 1} of {props.events.length}
                    </Card.Header>
                    <Card.Body className='event-exec-card-body'>
                        <ProgressBar 
                            animated 
                            now={(seconds / TIMER_SECONDS) * 100} 
                            variant={seconds === 1 ? "danger" : "warning"} 
                            className="event-exec-progress" 
                        />

                        <Card.Title className='event-exec-title'>{currentEvent.name}</Card.Title>
                        <Card.Text className='event-exec-description'>
                            {currentEvent.description}
                        </Card.Text>

                        <div className={`event-exec-amount ${currentEvent.coin_modifier >= 0 ? 'event-positive' : 'event-negative'}`}>
                            {currentEvent.coin_modifier > 0 ? '+' : ''}{currentEvent.coin_modifier}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default EventExecution