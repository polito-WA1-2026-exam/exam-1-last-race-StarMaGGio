const PREFIX = "http://localhost:3001/api/v1"
const LOGIN_FAILED_MSG = "Login failed!"
const LOGOUT_FAILED_MSG = "Logout failed!"

/**
 * API to fetch the user during the login phase
 * @param {string} username 
 * @param {string} password 
 * @returns user if login succeed, error otherwise
 */
export async function login(username, password) {
    const response = await fetch(PREFIX + "/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })

    if (response.ok) {
        const user = await response.json()
        return user
    } else throw new Error(LOGIN_FAILED_MSG)
}

/**
 * API to check if the client is currently logged in the application
 * @returns the logged user if the client is logged in the application, null otherwise
 */
export async function checkSession() {
    const response = await fetch(PREFIX + "/sessions/current", {
        credentials: "include"
    })

    if (response.ok) {
        return await response.json()
    } else {
        return null
    }
}

/**
 * API to delete the current session of the client when it does the logout
 * @returns true if the logout succeed, otherwise throws an error
 */
export async function logout() {
    const response = await fetch(PREFIX + "/sessions/current", {
        method: "DELETE",
        credentials: "include"
    })

    if (response.ok) return true
    else throw new Error(LOGOUT_FAILED_MSG)
}