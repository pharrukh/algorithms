import { Graph } from "../graph"
import { getRandomVertex } from "./random-utils"

export function generateErdosRenyiGraph(V: number, E: number): Graph {

  function getRandomEdge(V: number): [number, number] {
    return [getRandomVertex(V), getRandomVertex(V)]
  }

  const g = new Graph(V)
  for (let i = 0; i < E; i++) {
    const [p, q] = getRandomEdge(V)
    g.addEdge(p, q)
  }

  return g
}

// console.log(generateErdosRenyiGraph(10, 10).toString())
// console.log(generateErdosRenyiGraph(10, 10).toString())
// console.log(generateErdosRenyiGraph(10, 15).toString())
