import { Graph } from "./graph"

export function findBridges(G: Graph): [number, number][] {
  const marked = Array.from({ length: G.V() }, () => false)
  const disc = Array.from({ length: G.V() }, () => 0)
  const low = Array.from({ length: G.V() }, () => 0)
  const edgeTo = Array.from({ length: G.V() }, () => null)
  let time = 0

  function dfs(u: number): void {
    console.log(u)
    marked[u] = true
    disc[u] = ++time
    low[u] = disc[u]

    for (const v of G.adj(u)) {
      console.log("\t" + v)
      if (!marked[v]) {
        edgeTo[v] = u
        dfs(v)
        low[u] = Math.min(low[u], low[v])
      } else if (v !== edgeTo[u]) {
        low[u] = Math.min(low[u], disc[v])
      }
    }
  }

  const bridges = []

  for (let v = 0; v < G.V(); v++) {
    if (!marked[v]) dfs(v)
  }

  console.log(disc, low, edgeTo, marked)
  for (let v = 0; v < G.V(); v++) {
    const u = edgeTo[v]
    if (u !== null && disc[v] === low[v]) {
      bridges.push([u, v])
    }
  }

  return bridges
}

const graph1 = new Graph(10)
const edges1 = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 6],
  [2, 5],
  [6, 3],
  [3, 7],
  [4, 8],
  [8, 9],

  [1, 5],
  [6, 7],
  [4, 9],
]
edges1.forEach(([p, q]) => graph1.addEdge(p, q))
console.log(`I have found the following bridges: ${findBridges(graph1)}`)
