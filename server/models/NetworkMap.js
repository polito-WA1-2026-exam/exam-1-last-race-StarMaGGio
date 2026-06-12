import { Station } from "./Station.js"

export function NetworkMap(stationsData, segmentsData) {
    this.stations = {} // contains pairs (id -> Station)
    stationsData.forEach(s => { this.stations[s.id] = new Station(s.id, s.name) })
    segmentsData.forEach(s => { 
        if (this.stations[s.station_id_1] && this.stations[s.station_id_2]) { // Check that stations are already both in the stations collection
            this.stations[s.station_id_1].addAdjacentStation(s.station_id_2)
            this.stations[s.station_id_2].addAdjacentStation(s.station_id_1)
        }
    })

    this.getRandomStationId = () => {
        const stationsIds = Object.keys(this.stations)
        const randomIndex = Math.floor(Math.random() * stationsIds.length)
        return parseInt(stationsIds[randomIndex])
    }

    /**
     * Function that implement the BFS algorithm to find far destinations
     */
    this.getRandomDistantStationId = (startStationId, minDistance) => {
        const startIdStr = startStationId.toString()

        const distances = { [startIdStr]: 0}
        const queue = [startIdStr] // Start from the start station
        const validDestinations = []

        while (queue.length > 0) {
            const currentId = queue.shift() // Take the first element of the queue
            const currentDist = distances[currentId] // Check the distance of this element from start
            
            if (currentDist >= minDistance) {
                validDestinations.push(parseInt(currentId))
            }

            const currentStation = this.stations[currentId]

            for (const neighborId of currentStation.adjacentStations) {
                const neighborIdStr = neighborId.toString()

                if (distances[neighborIdStr] === undefined) {
                    distances[neighborIdStr] = currentDist + 1
                    queue.push(neighborIdStr)
                }
            }
        }

        const randomIndex = Math.floor(Math.random() * validDestinations.length)
        return validDestinations[randomIndex]
    }

    this.getRandomStartEndStations = (minDistance) => {
        const startStationId = this.getRandomStationId()
        const endStationId = this.getRandomDistantStationId(startStationId, minDistance)
        
        return {
            startStation: { id: startStationId, name: this.stations[startStationId].name },
            endStation: { id: endStationId, name: this.stations[endStationId].name }
        }
    }
}