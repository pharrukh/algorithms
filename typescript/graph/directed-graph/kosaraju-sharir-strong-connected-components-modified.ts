import { Graph } from "../undirected-graph/graph"
import { getIslomDAG, getSafiaDiraph } from "./data/digraphs"
import { DepthFirstOrder } from "./depth-first-order"
import { Digraph } from "./digraph"

export class KosarajuSharirSCC {
  marked: boolean[]
  ids: number[]
  count: number
  GR: Digraph

  constructor(private G: Digraph) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.ids = Array.from({ length: G.V() }, () => 0)
    this.count = 0
    this.GR = G.reverse()

    // this is modified GR -> G
    const order = new DepthFirstOrder(G)

    for (let v of order.reversePostOrder()) {
      if (!this.marked[v]) {
        this.dfs(v)
        this.count++
      }
    }
  }

  private dfs(v: number): void {
    this.ids[v] = this.count
    this.marked[v] = true

    // this is modifed G -> GR
    for (const w of this.GR.adj(v)) {
      if (!this.marked[w]) this.dfs(w)
    }
  }

  stronglyConneced(v: number, w: number): boolean {
    return this.ids[v] === this.ids[w]
  }

  id(v: number): number {
    return this.ids[v]
  }
}

;(async () => {
  // 4.2.22
  const g = getSafiaDiraph()
  const scc = new KosarajuSharirSCC(g)
  console.log(`${scc.count} strong components`)
  for (let i = 0; i < scc.count; i++) {
    const component = []
    for (let v = 0; v < g.V(); v++) {
      if (scc.ids[v] === i) component.push(v)
    }
    console.log(component.join(" "))
  }
})()
