import { getIlhomDAG } from "../data/digraphs"
import { Digraph } from "../digraph"
import { DirectedCycle } from "../directed-cycle"
import { DirectedDFS } from "../directed-dfs"
import { TransitiveClosure } from "../trasitive-closure"

export function getLowestCommonAncestorForDAG(
  G: Digraph,
  v: number,
  w: number
): number {
  const cycleFinder = new DirectedCycle(G)
  if (cycleFinder.hasCycle())
    throw new Error("The digraph has a cycle, so it is not a DAG")

  const sources = G.sources()
  let lca = null
  let maxH = -Infinity
  const marked = Array.from({ length: G.V() }, () => false)

  function dfs(u: number, h: number = 0): void {
    const reachabilityFinder = new DirectedDFS(G, u)
    if (
      reachabilityFinder.marked(v) &&
      reachabilityFinder.marked(w) &&
      maxH < h &&
      v != u &&
      w != u
    ) {
      lca = u
      maxH = h
    }
    marked[u] = true

    for (const w of G.adj(u)) {
      if (marked[w]) continue
      dfs(w, h + 1)
    }
  }

  for (const s of sources) dfs(s)

  return lca
}

const ilhomDAG = getIlhomDAG()
console.log(ilhomDAG.toString())
console.log(
  `Should give (0) for (1) and (3):`,
  getLowestCommonAncestorForDAG(ilhomDAG, 1, 3)
)
console.log(
  `Should give (1) for (3) and (4):`,
  getLowestCommonAncestorForDAG(ilhomDAG, 4, 3)
)

// Rene's examples

const digraph1 = new Digraph(5)
digraph1.addEdge(0, 1)
digraph1.addEdge(1, 2)
digraph1.addEdge(0, 3)
digraph1.addEdge(3, 4)
console.log(
  `Should give (0) for (2) and (4):`,
  getLowestCommonAncestorForDAG(digraph1, 2, 4)
)

const digraph2 = new Digraph(5)
digraph2.addEdge(0, 1)
digraph2.addEdge(0, 2)
digraph2.addEdge(2, 3)
digraph2.addEdge(2, 4)
console.log(
  `Should give (2) for (3) and (4):`,
  getLowestCommonAncestorForDAG(digraph2, 3, 4)
)

const digraph3 = new Digraph(9)
digraph3.addEdge(0, 1)
digraph3.addEdge(1, 2)
digraph3.addEdge(1, 3)

digraph3.addEdge(4, 5)
digraph3.addEdge(5, 6)
digraph3.addEdge(6, 8)
digraph3.addEdge(6, 7)
digraph3.addEdge(7, 2)
digraph3.addEdge(8, 3)
console.log(
  `Should give (6) for (3) and (2):`,
  getLowestCommonAncestorForDAG(digraph3, 3, 2)
)

const digraph4 = new Digraph(9)
digraph4.addEdge(0, 1)
digraph4.addEdge(1, 3)
digraph4.addEdge(1, 4)
digraph4.addEdge(4, 5)
digraph4.addEdge(5, 6)
digraph4.addEdge(6, 2)

digraph4.addEdge(7, 8)
digraph4.addEdge(8, 3)
digraph4.addEdge(7, 2)
console.log(
  `Should give (1) for (3) and (2):`,
  getLowestCommonAncestorForDAG(digraph4, 3, 2)
)

const digraph5 = new Digraph(4)
digraph5.addEdge(0, 1)
digraph5.addEdge(1, 2)
console.log(
  `Should give (null) for (3) and (2):`,
  getLowestCommonAncestorForDAG(digraph5, 3, 2)
)
