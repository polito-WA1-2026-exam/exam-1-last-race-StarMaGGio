const PREFIX = "http://localhost:3001/api/v1"

export async function sendRouteForValidation(startStation, endStation, selectedSegments) {
    try {
        const response = await fetch(PREFIX + "/game/validate-path", {
            method: "POST",
            body: JSON.stringify({
                startStation: startStation,
                endStation: endStation,
                selectedSegments: selectedSegments
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if (response.ok) {
            const result = await response.json()
            return result
        } else throw new Error("HTTP error in sendRouteForValidation, code = " + response.status)
    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}

export async function getRandomEvent() {
    try{
        const response = await fetch(PREFIX + "/events/random-one", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            const result = await response.json()
            return result
        } else throw new Error("HTTP error in getRandomEvent, code = " + response.status)

    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}