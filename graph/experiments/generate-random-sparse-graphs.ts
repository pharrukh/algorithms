import { Graph } from "../graph"
import { generateErdosRenyiGraph } from "./generate-erdos-renyi-graph"
import { getRandomInt } from "./random-utils"

export function generateRandomSparseGraphs(
  n: number,
  V: number = null,
  maxV: number = 100
): Graph[] {
  const getRandomNumberOfVertices = (): number => {
    const vSet = V ? [V] : [10, 100, 1_000, 1_000_000].filter((V) => V <= maxV)

    return vSet[getRandomInt(vSet.length)]
  }

  const getRandomNumberOfEdges = (V: number): number => {
    function getSign(): number {
      const r = Math.random()
      if (r < 0.5) return -1
      return 1
    }

    function getDeltaV(V: number, p: number = 0.05): number {
      const r = Math.random()
      return Math.floor(V * p * r)
    }

    const sign = getSign()
    const dV = getDeltaV(V)

    const E = V + sign * dV

    return E
  }

  const graphs = []

  for (let i = 0; i < n; i++) {
    const V = getRandomNumberOfVertices()
    const E = getRandomNumberOfEdges(V)
    graphs.push(generateErdosRenyiGraph(V, E))
  }

  return graphs
}

// const graphs = generateRandomSparseGraphs(2)
// graphs.forEach((g) => console.log(g.toString()))
