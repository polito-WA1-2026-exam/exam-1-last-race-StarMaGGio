const PREFIX = "http://localhost:3001/api/v1"

/**
 * API function to send the selected route for validation to the backend.
 * @param {int} startStation 
 * @param {int} endStation 
 * @param {*} selectedSegments 
 * @returns {Promise<Object>} A promise that resolves to the validation result, including the number of events to be executed or the event that caused the failure.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
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

/**
 * API function to fetch a random event from the backend.
 * @returns {Promise<Object>} A promise that resolves to a random event object.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
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