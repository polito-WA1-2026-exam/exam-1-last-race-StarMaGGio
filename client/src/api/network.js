const PREFIX = "http://localhost:3001/api/v1"

export async function getSegments() {
    try {
        const response = await fetch(PREFIX + "/network/segments", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            const segments = await response.json()
            return segments
        } else throw new Error("HTTP error in getSegments, code = " + response.status)
    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}

export async function getRandomStartEndStations() {
    try {
        const response = await fetch(PREFIX + "/network/stations/random-start-end", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            const start_end = await response.json()
            return start_end
        } else throw new Error("HTTP error in getRandomStartEndStations, code = " + response.status)
    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}