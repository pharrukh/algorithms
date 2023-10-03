import { Graph } from "./graph"

// function
export function findRedundantVertex(G: Graph): number {
  const marked = Array.from({ length: G.V() }, () => false)
  let redundantV = null

  function dfs(v: number): void {
    if (redundantV !== null) return
    marked[v] = true
    let allMarked = true
    for (let w of G.adj(v)) {
      if (marked[w]) continue
      allMarked = false
      dfs(w)
    }
    if (allMarked) redundantV = v
  }

  dfs(0)
  return redundantV
}

const flatGraph = new Graph(4)
const edges1 = [
  [0, 1],
  [1, 2],
  [2, 3],
]
edges1.forEach(([p, q]) => flatGraph.addEdge(p, q))
console.log(`the redundant vertex is '${findRedundantVertex(flatGraph)}'`) // should be 3 or 0

const tree = new Graph(6)
const edges2 = [
  [0, 2],
  [0, 3],
  [2, 4],
  [2, 5],
  [3, 1],
]
edges2.forEach(([p, q]) => tree.addEdge(p, q))
console.log(`the redundant vertex is '${findRedundantVertex(tree)}'`) // should be 1, 4 or 5

const denceGraph = new Graph(4)
const edges3 = [
  [0, 1],
  [0, 2],
  [2, 1],
  [2, 3],
  [1, 3],
]
edges3.forEach(([p, q]) => tree.addEdge(p, q))
console.log(`the redundant vertex is '${findRedundantVertex(denceGraph)}'`) // should be any {0,1,2,3}
