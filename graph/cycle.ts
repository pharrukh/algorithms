import { Graph } from "./graph"

// functional solution
function hasCycle(G: Graph): boolean {
  const marked = Array.from({ length: G.V() }, () => false)
  let isCycleFound = false
  // console.log(marked)
  function dfs(v: number, u: number): void {
    marked[v] = true
    for (let w of G.adj(v)) {
      // console.log(w, v, u, marked[w], w != u, G.adj(v).toString())
      if (!marked[w]) dfs(w, v)
      else {
        if (w != u) isCycleFound = true
      }
    }
  }

  for (let v = 0; v < G.V(); v++) {
    if (!marked[v]) dfs(v, v)
  }
  // console.log(marked)
  return isCycleFound
}

const noCycleGraph = new Graph(7)
const edges1 = [
  [2, 1],
  [1, 3],
  [2, 6],
  [2, 4],
  [3, 5],
  [0, 4],
]
edges1.forEach(([p, q]) => noCycleGraph.addEdge(p, q))
console.log("a graph witout a cycle has a cycle?", hasCycle(noCycleGraph))

const withCycleGraph = new Graph(6)
const edges2 = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 3],
]
edges2.forEach(([p, q]) => withCycleGraph.addEdge(p, q))
console.log("a graph with a cycle has a cycle?", hasCycle(withCycleGraph))
