import path from "path"
import { generateErdosRenyiGraph } from "./generate-erdos-renyi-graph"
import { generateRandomSimpleGraph } from "./generate-random-simple-graph"
import { generateRandomSparseGraphs } from "./generate-random-sparse-graphs"
import { isTwoColor } from "../two-color"

// const V = 1200
// const E = 2000

const N = 10000

console.log(`N: ${N}`)

function runExperiment(V: number, E: number): void {
  const counts = {
    0: 0,
    1: 0,
    2: 0,
  }

  for (let i = 0; i < N; i++) {
    const erdosRenyiGraph = generateErdosRenyiGraph(V, E)
    const simpleGraph = generateRandomSimpleGraph(V, E)
    const sparseGraph = generateRandomSparseGraphs(1, V)[0]

    const graphs = [erdosRenyiGraph, simpleGraph, sparseGraph]
    for (let j = 0; j < 3; j++) {
      const graph = graphs[j]
      const check = isTwoColor(graph)
      counts[j] += check ? 1 : 0
    }
  }

  console.log(` V: ${V} E: ${E}
    Erdos Renyi Graph: ${counts[0]}/${N} (${(counts[0] * 100) / N}}%)
    Simple Graph: ${counts[1]}/${N} (${(counts[1] * 100) / N}}%)
    Random Sparse Graph: ${counts[2]}/${N} (${(counts[2] * 100) / N}}%)
  `)
}

for (let V of [10, 100, 1000, 10000]) {
  for (let k of [0, 0.5, 1, 1.5, 2, 2.5]) {
    const E = V * k
    runExperiment(V, E)
  }
}
