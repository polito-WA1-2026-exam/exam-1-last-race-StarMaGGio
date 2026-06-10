/**
 * Data Access Object
 */

import sqlite from 'sqlite3'
import crypto from 'crypto'
import { resolve } from 'dns';

const db = new sqlite.Database("database.db", (err) => {
    if (err) throw err;
    else console.log("Database connected successfully") // Keep for debug, remove later
})

/**
 * Method to get a user from the database through it's email and password that
 * will be validated via crypto.script
 * @param {*} username 
 * @param {*} password 
 * @returns a promise with:
 * - reject(err) if error in connecting to the database or hashing the password
 * - resolve(false) if username not found in the database or the hashed password do not coincide with the hash in the database
 * - resolve(user) if the username is fount in the database and the hashed password coincide
 */
export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {

        const query = ` SELECT *
                        FROM users 
                        WHERE username = ?
                        `
        
        db.get(query, [username], (err, row) => {
            if (err) return reject(err)                        // DB error

            else if (row == undefined) return resolve(false)   // Username not found in the database

            else {                                      // Username found in the database -> check password
                // User informations to return
                const user = {
                    id: row.id,
                    username: row.username
                }

                // Check password validity
                crypto.scrypt(password, row.salt, 16, function(err, hashedPassword) {
                    if (err) return reject(err)                // Error in hashing the password

                    if (!crypto.timingSafeEqual(Buffer.from(row.password_hash, "hex"), hashedPassword))
                        resolve(false)                  // Wrong password
                    else
                        resolve(user)                   // Correct password
                })
            }
        })
    })
}

/**
 * Method to get, from the games table in the database, for each user
 * who played at least one game, the best score through games he played.
 * @returns a list of pairs with the user and its best score
 */
export const getBestScores = () => {
    return new Promise((resolve, reject) => {

        const query = ` SELECT 
                            RANK() OVER (ORDER BY MAX(g.final_score) DESC) AS ranking_position,
                            u.username,
                            MAX(g.final_score) as best_score
                        FROM users u JOIN games g ON u.id = g.user_id
                        GROUP BY u.id, u.username
                        ORDER BY best_score DESC;
                        `
        db.all(query, (err, rows) => {
            if (err) return reject(err)

            else resolve(rows)
        })

    })
}

/**
 * Method to get from the database the list of segments that connect
 * all the stations of the network map
 * @returns the names of the two stations and the color of the line of the segment
 */
export const getSegments = () => {
    return new Promise((resolve, reject) => {

        const query = ` SELECT 
                            s1.name AS nameS1, 
                            s2.name AS nameS2, 
                            l.color AS lineColor
                        FROM 
                            segments seg
                        JOIN 
                            stations s1 ON seg.station_id_1 = s1.id
                        JOIN 
                            stations s2 ON seg.station_id_2 = s2.id
                        JOIN 
                            lines l ON seg.line_id = l.id;
                        `

        db.all(query, (err, rows) => {
            if (err) return reject(err)
            
            else resolve(rows)
        })
    })
}