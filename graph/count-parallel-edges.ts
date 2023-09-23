import assert = require("assert")
import { Graph } from "./graph"

export function countParallelEdges(G: Graph): number {
  let count = 0
  const edgeMap = new Map<number, number>()

  for (let v = 0; v < G.V(); v++) {
    for (let w of G.adj(v)) {
      if (edgeMap.get(v) === w) count++
      else if (edgeMap.get(w) === v) continue
      edgeMap.set(v, w)
    }
  }

  return count
}

const graph1 = new Graph(4)
const edges1 = [
  [0, 1],
  [1, 0],
  [1, 2],
  [2, 3],
  [3, 2],
  [3, 0],
]
edges1.forEach(([p, q]) => graph1.addEdge(p, q))
const parallelEdgesCount = countParallelEdges(graph1)
console.log(`There are ${parallelEdgesCount} parallel edges.`) // expected 2
