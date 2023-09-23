import { Graph } from "./graph"

// functional
export function isTwoColor(G: Graph): boolean {
  const marked = Array.from({ length: G.V() }, () => false)
  const color = Array.from({ length: G.V() }, () => false)
  let isTwoColorable = true

  function dfs(v: number): void {
    marked[v] = true
    for (let w of G.adj(v)) {
      if (!marked[w]) {
        color[w] = !color[v]
        dfs(w)
      } else if (color[w] === color[v]) isTwoColorable = false
    }
  }

  for (let v = 0; v < G.V(); v++) {
    if (!marked[v]) dfs(v)
  }
  // console.log(color)
  return isTwoColorable
}

// const twoColoredGraph = new Graph(8)
// const edges1 = [
//   [0, 1],
//   [0, 3],
//   [1, 2],
//   [1, 4],
//   [3, 4],
//   [3, 5],
//   [2, 6],
//   [4, 6],
//   [4, 7],
//   [5, 7],
// ]
// edges1.forEach(([p, q]) => twoColoredGraph.addEdge(p, q))
// console.log(
//   "a graph with two colors has two-colored?",
//   isTwoColor(twoColoredGraph)
// )

// const notTwoColoredGraph = new Graph(5)
// const edges2 = [
//   [0, 1],
//   [0, 3],
//   [1, 3],
//   [1, 2],
//   [2, 4],
// ]
// edges2.forEach(([p, q]) => notTwoColoredGraph.addEdge(p, q))
// console.log(
//   "a graph without two colors has two-colored?",
//   isTwoColor(notTwoColoredGraph)
// )
