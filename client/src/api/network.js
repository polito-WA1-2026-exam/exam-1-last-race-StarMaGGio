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