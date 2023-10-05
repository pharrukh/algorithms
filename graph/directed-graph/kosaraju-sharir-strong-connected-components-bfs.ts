import { Queue } from "../../queue/queue"
import { Graph } from "../undirected-graph/graph"
import { getIslomDAG, getSafiaDiraph } from "./data/digraphs"
import { DepthFirstOrder } from "./depth-first-order"
import { Digraph } from "./digraph"

export class KosarajuSharirSCC {
  marked: boolean[]
  ids: number[]
  count: number

  constructor(private G: Digraph) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.ids = Array.from({ length: G.V() }, () => 0)
    this.count = 0

    const order = new DepthFirstOrder(G.reverse())

    for (let v of order.reversePostOrder()) {
      if (!this.marked[v]) {
        this.bfs(v)
        this.count++
      }
    }
  }

  private bfs(v: number): void {
    const q = new Queue<number>()
    q.enqueue(v)
    
    while (!q.isEmpty()) {
      const w = q.dequeue()
      this.ids[w] = this.count
      this.marked[w] = true

      for (const u of this.G.adj(w)) {
        if (!this.marked[u]) q.enqueue(u)
      }
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
