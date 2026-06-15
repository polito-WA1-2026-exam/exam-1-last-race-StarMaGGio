import { useEffect, useState } from 'react'
import { Container, Card, ProgressBar } from 'react-bootstrap'

function EventExecution(props) {
    const [currentEventId, setCurrentEventId] = useState(0)
    const [seconds, setSeconds] = useState(3)

    // Apply event modifier and reset the timer on current event change
    useEffect(() => {
        if (!props.events || props.events.length === 0) return

        const currentEvent = props.events[currentEventId]
        props.setCoins((prevValue) => prevValue + currentEvent.modifier)

        setSeconds(3)
    }, [currentEventId])

    // Timer between one event and the next one
    useEffect(() => {
        if (!props.events || props.events.length === 0) return

        if (seconds === 0) {
            if (currentEventId < props.events.length - 1) {
                setCurrentEventId(currentEventId + 1)
            } else {
                // Go to result phase
            }
            return
        }

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [seconds, currentEventId, props.events])

    if (!props.events || props.events.length === 0) {
        // TODO: Show message and remove all coins
        return null
    }

    const currentEvent = props.events[currentEventId]

    return (
        <>
            <Container className='d-flex flex-column align-items-center mt-4'>
                <h2 className='mb-4 text-primary fw-bold'>Events happened during the journey</h2>

                <Card className="text-center shadow-lg border-0" style={{ width: '100%', maxWidth: '500px' }}>
                    <Card.Header className='bg-dark text-white fs-5'>
                        Event {currentEventId + 1} of {props.events.length}
                    </Card.Header>
                    <Card.Body className='p-5'>
                        <ProgressBar 
                            animated 
                            now={(seconds / 3) * 100} 
                            variant={seconds === 1 ? "danger" : "warning"} 
                            className="mb-4" 
                            style={{ height: '10px' }}
                        />

                        <Card.Title className='fs-2 mb-3 fw-bold'>{currentEvent.name}</Card.Title>
                        <Card.Text className='fs-4 mb-4 text-muted'>
                            {currentEvent.description}
                        </Card.Text>

                        <div className={`fs-2 fw-bold mb-5 ${currentEvent.modifier >= 0 ? 'text-success' : 'text-danger'}`}>
                            {currentEvent.modifier > 0 ? '+' : ''}{currentEvent.modifier}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default EventExecution