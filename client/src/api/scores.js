const PREFIX = "http://localhost:3001/api/v1"

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