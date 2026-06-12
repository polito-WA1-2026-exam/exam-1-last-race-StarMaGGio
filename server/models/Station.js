export function Station(id, name) {
    this.id = id;
    this.name = name;
    this.adjacentStations = [] // IDs of stations connected by a segment

    this.addAdjacentStation = (stationId) => { if (!this.adjacentStations.includes(stationId)) this.adjacentStations.push(stationId) }
}