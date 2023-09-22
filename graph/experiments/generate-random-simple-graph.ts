import { Graph } from "../graph"
import { getRandomInt } from "./random-utils"

export function generateRandomSimpleGraph(V: number, E: number): Graph {
  const maxE = (V * (V - 1)) / 2
  if (E > maxE)
    throw new Error(
      `The max edges for a simple graph with ${V} vertices is ${maxE}, while ${E} was requested.`
    )

  function getRandomVertex(V: number): number {
    return getRandomInt(V)
  }

  function getRandomEdge(V: number): [number, number] {
    return [getRandomVertex(V), getRandomVertex(V)]
  }

  const g = new Graph(V)
  let e = 0
  while (e < E) {
    const [p, q] = getRandomEdge(V)
    if (p === q || g.hasEdge(p, q)) continue
    g.addEdge(p, q)
    e++
  }

  return g
}

// console.log(generateRandomSimpleGraph(6, 16).toString())
// console.log(generateRandomSimpleGraph(10, 10).toString())
// console.log(generateRandomSimpleGraph(10, 15).toString())
