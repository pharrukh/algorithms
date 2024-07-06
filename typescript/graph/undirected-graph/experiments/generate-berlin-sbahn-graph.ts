// I think I am proud of this code, it required an efford to clean the data
import lines from "./data/clean/lines.json"
import stationCoordinateMap from "./data/clean/berlin-station-names-with-coordinates.json"
import { EuclidianGraph, Point } from "../creative/euclidian-graph"
import { SymbolGraph } from "../symbol-graph"
import { Edge } from "../types"
import { BreadthFirstPath } from "../breadth-first-path"
import { createInterface } from "readline"

export function generateBerlinSbahnSymbolGraph(): SymbolGraph {
  const edges = new Set<Edge>()
  for (const line in lines) {
    const stations = lines[line]
    for (let i = 0; i < stations.length - 1; i++) {
      const aName = stations[i]
      const bName = stations[i + 1]
      edges.add(`${aName}__${bName}`)
    }
  }
  // console.log(map.size, edges.size)

  const sg = new SymbolGraph(edges)
  return sg
}

export function generateBerlinSbahnEuclidianGraph(): EuclidianGraph {
  const g = new EuclidianGraph()
  const map = new Map(stationCoordinateMap as [[string, [number, number]]])

  console.log(map.size)
  for (const line in lines) {
    const stations = lines[line]
    for (let i = 0; i < stations.length - 1; i++) {
      const aName = stations[i]
      const bName = stations[i + 1]

      const aCoordinates = map.get(aName)
      const aStation: Point = {
        name: aName,
        x: aCoordinates[0],
        y: aCoordinates[1],
      }
      if (!g.contains(aStation)) g.addVertex(aStation)

      const bCoordinates = map.get(bName)
      const bStation: Point = {
        name: bName,
        x: bCoordinates[0],
        y: bCoordinates[1],
      }
      if (!g.contains(bStation)) g.addVertex(bStation)

      g.addEdge(aStation, bStation)
    }
  }

  return g
}

;(async () => {
  const sg = generateBerlinSbahnSymbolGraph()

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const message =
    'Please, write from and to stations separated by comma, like this: "Wuhletal,Warschauer Straße | Raoul-Wallenberg-Straße,Wuhletal | Raoul-Wallenberg-Straße,Potsdam Hauptbahnhof".'
  console.log(message)

  for await (const sink of rl) {
    const [from, to] = sink.split(",")
    // console.log("V:", sg.G.V(), " E:", sg.G.E())
    const g = sg.G
    if (!sg.contains(from))
      throw new Error(`The symbol graph does not have "${from}"`)

    const s = sg.index(from)
    const bfs = new BreadthFirstPath(g, s)

    const bfp = new BreadthFirstPath(sg.G, sg.index(from))
    const path = bfp.pathTo(sg.index(to))

    console.log(bfp.hasPathTo(sg.index(to)), getPrintablePathTo(path, sg))

    function getPrintablePathTo(
      path: Iterable<number>,
      sg: SymbolGraph
    ): string {
      let str = ""
      for (let v of path) {
        str += " -> " + sg.name(v)
      }
      return str
    }

    if (sg.contains(to)) {
      const t = sg.index(to)
      if (bfs.hasPathTo(t)) {
        for (const v of bfs.pathTo(t)) {
          console.log("   " + sg.name(v))
        }
      } else {
        console.log("Not connected")
      }
    } else {
      console.log("   Not in database.")
    }
  }

  rl.close()
})()
