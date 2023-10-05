import { Stack } from "../../stack/stack"
import { hasCycle } from "./cycle"
import { Graph } from "./graph"

const graphsAsStrings = [
  "0-1 0-2 0-3 1-3 1-4 2-5 2-9 3-6 4-7 4-8 5-8 5-9 6-7 6-9 7-8",
  "0-1 0-2 0-3 1-3 0-3 2-5 5-6 3-6 4-7 4-8 5-8 5-9 6-7 6-9 8-8",
  "0-1 1-2 1-3 0-3 0-4 2-5 2-9 3-6 4-7 4-8 5-8 5-9 6-7 6-9 7-8",
  "4-1 7-9 6-2 7-3 5-0 0-2 0-8 1-6 3-9 6-3 2-8 1-5 9-8 4-5 4-7",
]

const [edges1, edges2, edges3, edges4] = graphsAsStrings.map(
  (graphAsString) => {
    const edgesAsStrings = graphAsString.split(" ")
    const edges = edgesAsStrings.map((edgeAsString) => {
      const [p, q] = edgeAsString.split("-")
      return [parseInt(p), parseInt(q)]
    })
    return edges
  }
)

const graph1 = new Graph(10)
edges1.forEach(([p, q]) => graph1.addEdge(p, q))

const graph2 = new Graph(10) // self-loops and parallel edges
edges2.forEach(([p, q]) => graph2.addEdge(p, q))

const graph3 = new Graph(10)
edges3.forEach(([p, q]) => graph3.addEdge(p, q))

const graph4 = new Graph(10)
edges4.forEach(([p, q]) => graph4.addEdge(p, q))

const graph5 = new Graph(6)
const edges5 = [
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
]
edges5.forEach(([p, q]) => graph5.addEdge(p, q))

let i = 1
for (let graph of [graph1, graph2, graph3, graph4, graph5]) {
  const maybeEulerianCycle = getEulerianCycle(graph)

  console.log(`Graph ${i++}
  has cycle? ${hasCycle(graph)}
  has Eulerian cycle? ${maybeEulerianCycle ? maybeEulerianCycle : "no"}
  `)
}

function getPathFrom(edgeTo: number[]): number[] {
  const path = []
  for (let x = 0; x != 0; x = edgeTo[x]) {
    path.push(x)
  }
  return path
}

function getEulerianCycle(G: Graph): number[] | null {
  const areAllVertexDegreesEven = (): boolean => {
    for (const v of G) {
      if (G.degree(v) % 2 !== 0) {
        console.log(`Vertex ${v} has an odd degree ${G.degree(v)}`)
        return false
      }
    }
    return true
  }

  if (!areAllVertexDegreesEven()) {
    console.log(`The graph has odd degrees!\n`)
    return null
  }

  const answer: number[] = []
  const s: Stack<number> = new Stack<number>()
  s.push(0)

  while (!s.isEmpty()) {
    const v = s.peek()

    if (G.degree(v) === 0) {
      answer.push(v)
      s.pop()
    } else {
      const w: number | undefined = G.adj(v).getAny()
      if (w !== undefined) {
        s.push(w)
        G.removeEdge(v, w)
      }
    }
  }

  return answer.reverse()
}
