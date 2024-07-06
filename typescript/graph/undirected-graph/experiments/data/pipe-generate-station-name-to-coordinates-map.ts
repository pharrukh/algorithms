import uFuzzy from "@leeoniya/ufuzzy"
import { read, readFileSync, stat, writeFileSync } from "fs"

const sbahnBerlinLinesAsString = readFileSync("sbahn-berlin.txt")
const lines: { [key: string]: string[] } = {}

const allStations: string[] = []
for (const line of sbahnBerlinLinesAsString.toString().split("\n")) {
  const [lineName, pathAsString] = line.split(" | ")
  const stations = pathAsString.split(" – ")

  for (let i = 0; i < stations.length; i++) {
    stations[i] = stations[i].replace(/ \(U.*\)/g, "")
  }

  allStations.push(...stations)
  lines[lineName] = stations
}
writeFileSync("lines.json", JSON.stringify(lines))

const n = allStations.length
for (let i = 0; i < n; i++) {
  allStations[i] = allStations[i]
}

const unitStationsFromLines = Array.from(new Set(allStations)).sort()
console.log(`There are ${unitStationsFromLines.length} unique stations`)

const berlinStationCoordinatesAsSting = readFileSync(
  "BVV-Station-Coordinates.CSV"
)

const R = 6371 // Earth radius
// see https://stackoverflow.com/a/1185413/3407539
function calcX(lat: number, lon: number): number {
  return R * Math.cos(lat) * Math.cos(lon)
}

function calcY(lat: number, lon: number): number {
  return R * Math.cos(lat) * Math.sin(lon)
}

let i = 0
const map = new Map<string, [number, number]>()
for (let line of berlinStationCoordinatesAsSting.toString().split("\n")) {
  if (i++ === 0) continue
  const [name, elementName, , , , lonStr, latStr] = line.split(";")
  if (map.has(name)) continue
  if (name && lonStr && latStr) {
    const lon = parseFloat(lonStr.replace(",", "."))
    const lat = parseFloat(latStr.replace(",", "."))

    const x = calcX(lat, lon)
    const y = calcY(lat, lon)
    map.set(name, [x, y])
    map.set(elementName, [x, y])
  }
}

const names = Array.from(map.keys())

const cleanStationCoordinateMap = new Map<string, [number, number]>()

let uf = new uFuzzy({})
let k = 0
for (let station of unitStationsFromLines) {
  let idxs = uf.filter(names, station)
  if (idxs.length === 0) {
    console.log(`\nCould not find ${station}.\n`)
    k++
  } else {
    cleanStationCoordinateMap.set(station, map.get(names[idxs[0]]))
  }
}

console.log(
  `I could not find ${k} stations that is ${Math.floor(
    (k * 100) / unitStationsFromLines.length
  )} %`
)

writeFileSync(
  "berlin-station-names-with-coordinates.json",
  JSON.stringify(Array.from(cleanStationCoordinateMap))
)
