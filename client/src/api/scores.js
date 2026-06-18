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