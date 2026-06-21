const PREFIX = "http://localhost:3001/api/v1"
const LOGIN_FAILED_MSG = "Login failed!"
const LOGOUT_FAILED_MSG = "Logout failed!"

/**
 * API to fetch the user during the login phase
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>} A promise that resolves to the user object if the login is successful
 * @throws {Error} Throws an error if the login fails
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
 * @returns {Promise<Object|null>} A promise that resolves to the user object if the session is valid, otherwise null
 * @throws {Error} Throws an error if the network request fails
 */
export async function checkSession() {
    try {
        const response = await fetch(PREFIX + "/sessions/current", {
            credentials: "include"
        })

        if (response.ok) {
            return await response.json()
        } else return null
    } catch (ex) {
        throw new Error("Network Error", {cause: ex})
    }
    
}

/**
 * API to delete the current session of the client when it does the logout
 * @returns {Promise<boolean>} A promise that resolves to true if the logout is successful
 * @throws {Error} Throws an error if the logout fails
 */
export async function logout() {
    const response = await fetch(PREFIX + "/sessions/current", {
        method: "DELETE",
        credentials: "include"
    })

    if (response.ok) return true
    else throw new Error(LOGOUT_FAILED_MSG)
}