const PREFIX = "http://localhost:3001/api/v1"

/**
 * API function to fetch the segments from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of segments.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
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

/**
 * API function to fetch random start and end stations from the backend.
 * @returns {Promise<Object>} A promise that resolves to an object containing the random start and end stations.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
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