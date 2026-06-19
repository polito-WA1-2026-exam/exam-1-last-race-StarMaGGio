const PREFIX = "http://localhost:3001/api/v1"

/**
 * API function to fetch the best scores from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of the best scores.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
export async function getBestScores() {
    try {
        const response = await fetch(PREFIX + "/scores/bests", {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            const best_scores = await response.json()
            return best_scores
        } else throw new Error("HTTP error in getBestScores, code = " + response.status)
    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}

/**
 * API function to save the final score of the player to the backend.
 * @param {int} score 
 * @returns {Promise<void>} A promise that resolves if the score is saved successfully.
 * @throws {Error} Throws an error if the network request fails or if the response is not ok.
 */
export async function saveScoreToBackend(score) {
    try {
        const response = await fetch(PREFIX + "/scores", {
            method: "POST",
            body: JSON.stringify({
                finalScore: score
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if (response.ok) {
            return
        } else throw new Error("HTTP error in saveScoreToBackend, code = " + response.status)
    } catch (err) {
        throw new Error("Network Error", {cause: ex})
    }
}