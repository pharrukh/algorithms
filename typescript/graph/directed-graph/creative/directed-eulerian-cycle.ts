import { Digraph } from "../digraph"

export function getDirectedEulerianCycle(G: Digraph): number[] | null {
  const g = G.clone()
  for (let v = 0; v < G.V(); v++) {
    if (G.indegree(v) !== G.outdegree(v)) {
      return null
    }
  }

  const path = []

  function dfs(v: number): void {
    for (const w of g.adj(v)) {
      if (!g.hasEdge(v, w)) continue
      g.removeEdge(v, w)
      path.push(w)
      dfs(w)
    }
  }

  path.push(0)
  dfs(0)

  return path
}

const g = new Digraph(5)
const edges = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 0],
  [3, 4],
  [4, 0],
]
edges.forEach(([v, w]) => g.addEdge(v, w))
console.log(getDirectedEulerianCycle(g))
