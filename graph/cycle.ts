import { Graph } from "./graph"

// functional solution
export function hasCycle(G: Graph): boolean {
  const marked = Array.from({ length: G.V() }, () => false)
  const edgeTo = Array.from({ length: G.V() }, () => null)

  let isCycleFound = false
  function dfs(v: number, u: number): void {
    marked[v] = true
    edgeTo[v] = u
    for (let w of G.adj(v)) {
      if (!marked[w]) dfs(w, v)
      else {
        if (w != u && v !== w && v !== edgeTo[w]) isCycleFound = true
      }
    }
  }

  for (let v = 0; v < G.V(); v++) {
    if (!marked[v]) dfs(v, v)
  }
  // console.log(marked)
  return isCycleFound
}

// const noCycleGraph = new Graph(7)
// const edges1 = [
//   [0, 0], // self-loop
//   [2, 1],
//   [1, 2], // parallel edge
//   [1, 3],
//   [2, 6],
//   [2, 4],
//   [3, 5],
//   [0, 4],
// ]
// edges1.forEach(([p, q]) => noCycleGraph.addEdge(p, q))
// console.log("a graph witout a cycle has a cycle?", hasCycle(noCycleGraph))

// const withCycleGraph = new Graph(6)
// const edges2 = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [5, 3],
// ]
// edges2.forEach(([p, q]) => withCycleGraph.addEdge(p, q))
// console.log("a graph with a cycle has a cycle?", hasCycle(withCycleGraph))
