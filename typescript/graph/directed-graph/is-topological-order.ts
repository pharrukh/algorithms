import { getIlhomDAG, getIslomDAG, getTimurDAG } from "./data/digraphs"
import { Digraph } from "./digraph"
import { DirectedCycle } from "./directed-cycle"

type AlgorithmType = "by-edges" | "by-vertices"
export function isTopologicalOrder(
  G: Digraph,
  L: number[],
  type: AlgorithmType = "by-edges"
): boolean {
  const cycleFinder = new DirectedCycle(G)
  if (cycleFinder.hasCycle())
    throw new Error("The graph is not a DAG! Only a DAG has topological order.")

  if (type === "by-vertices") {
    const marked = Array.from({ length: G.V() }, () => false)
    for (const u of L) {
      marked[u] = true
      for (const v of G.adj(u)) {
        if (marked[v]) return false
      }
    }
    return true
  } else if (type === "by-edges") {
    const mapL = new Map<number, number>()
    for (let i = 0; i < L.length; i++) {
      mapL.set(L[i], i)
    }

    for (let v = 0; v < G.V(); v++) {
      const i = mapL.get(v)
      for (const w of G.adj(v)) {
        const j = mapL.get(w)
        if (i > j) return false
      }
    }
    return true
  } else {
    throw new Error(`Unsupported algorithm type "${type}"`)
  }
}

function test(g: Digraph, name: string, L: number[], expected: boolean): void {
  const cycleFinder = new DirectedCycle(g)
  if (!cycleFinder.hasCycle()) {
    const orderStr = L.join("->")
    console.log(
      `Is ${orderStr} a topological sort for ${name} graph (expected "${expected}")?`
    )
    console.log("test by edges: ", isTopologicalOrder(g, L, "by-edges"))
    console.log("test by vertices: ", isTopologicalOrder(g, L, "by-vertices"))
    console.log("\n\n")
  }
}

;(async () => {
  test(getIslomDAG(), "Islom", [1, 0, 3, 2, 4, 5], true)
  test(getIslomDAG(), "Islom", [0, 1, 3, 2, 5, 4], false)
  test(getTimurDAG(), "Timur", [8, 7, 2, 3, 0, 6, 9, 10, 11, 12, 1, 5, 4], true)
  test(getIlhomDAG(), "Ilhom", [0, 1, 4, 2, 3], true)
  test(getIlhomDAG(), "Ilhom", [0, 2, 1, 3, 4], true)
  test(getIlhomDAG(), "Ilhom", [0, 1, 2, 3, 4], true)
})()
