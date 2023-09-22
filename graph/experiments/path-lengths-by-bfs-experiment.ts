import path from "path"
import { DepthFirstPath } from "../depth-first-path"
import { generateBerlinSbahnGraph } from "./generate-berlin-sbahn-graph"
import { generateErdosRenyiGraph } from "./generate-erdos-renyi-graph"
import { generateRandomSimpleGraph } from "./generate-random-simple-graph"
import { generateRandomSparseGraphs } from "./generate-random-sparse-graphs"
import { getRandomVertex } from "./random-utils"
import { Graph } from "../graph"
import { BreadthFirstPath } from "../breadth-first-path"

const berlinSbahnSymbolGraph = generateBerlinSbahnGraph()

const V = 170
const E = 200

const berlinSbahnGraph = berlinSbahnSymbolGraph.G
const erdosRenyiGraph = generateErdosRenyiGraph(V, E)
const simpleGraph = generateRandomSimpleGraph(V, E)
const sparseGraph = generateRandomSparseGraphs(1, V)[0]

const N = 100000

console.log(`N: ${N}`)
runExperiment(N, V, berlinSbahnGraph, "Berlin S-Bahn Graph")
runExperiment(N, V, erdosRenyiGraph, "Erdos Renyi Graph")
runExperiment(N, V, simpleGraph, "Simple Graph")
runExperiment(N, V, sparseGraph, "Sparse Graph")

function runExperiment(N: number, V: number, g: Graph, title: string): void {
  console.log("\n\n" + title)
  const pathLengths = []
  for (let i = 0; i < N; i++) {
    const v = getRandomVertex(V - 1)
    const w = getRandomVertex(V - 1)

    const bfp = new BreadthFirstPath(g, v)
    if (!bfp.hasPathTo(w)) continue

    const path = bfp.pathTo(w)

    const pathLength = Array.from(path).length
    pathLengths.push(pathLength)
  }

  console.log(`Probability to find a path: ${(pathLengths.length * 100) / N}%`)
  console.log(`Average path length: ${average(pathLengths)}`)

  function average(A: number[]): number {
    return Math.floor(A.reduce((acc, a) => acc + a) / A.length)
  }
}
