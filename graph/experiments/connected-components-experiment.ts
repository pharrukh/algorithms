import path from "path"
import { generateBerlinSbahnGraph } from "./generate-berlin-sbahn-graph"
import { generateErdosRenyiGraph } from "./generate-erdos-renyi-graph"
import { generateRandomSimpleGraph } from "./generate-random-simple-graph"
import { generateRandomSparseGraphs } from "./generate-random-sparse-graphs"
import { ConnectedComponents } from "../connected-compontnets"

const V = 100000
const E = 200

const N = 100

console.log(`N: ${N}`)

function runExperiment(): void {
  const erdosRenyiGraphComponentCounts = []
  const simpleGraphComponentCounts = []
  const sparseGraphComponentCounts = []

  const counts = [
    erdosRenyiGraphComponentCounts,
    simpleGraphComponentCounts,
    sparseGraphComponentCounts,
  ]

  for (let i = 0; i < N; i++) {
    const erdosRenyiGraph = generateErdosRenyiGraph(V, E)
    const simpleGraph = generateRandomSimpleGraph(V, E)
    const sparseGraph = generateRandomSparseGraphs(1, V)[0]

    const graphs = [erdosRenyiGraph, simpleGraph, sparseGraph]
    for (let j = 0; j < 3; j++) {
      const graph = graphs[j]
      const cc = new ConnectedComponents(graph)
      counts[j].push(cc.getCount())
    }
  }
  console.log(counts)
}

runExperiment()
