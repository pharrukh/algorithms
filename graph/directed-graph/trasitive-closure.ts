import { Digraph } from "./digraph"
import { DirectedDFS } from "./directed-dfs"

export class TransitiveClosure {
  all: DirectedDFS[]

  constructor(G: Digraph) {
    this.all = Array.from({ length: G.V() }, () => null)
    for (let v = 0; v < G.V(); v++) {
      this.all[v] = new DirectedDFS(G, v)
    }
  }

  reachable(v: number, w: number): boolean {
    return this.all[v].marked(w)
  }
}
