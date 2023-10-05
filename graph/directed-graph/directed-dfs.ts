import { Digraph } from "./digraph"

export class DirectedDFS {
  private _marked: boolean[]

  constructor(G: Digraph, v: number) {
    this._marked = Array.from({ length: G.V() }, () => false)
    this.dfs(G, v)
  }

  dfs(G: Digraph, v: number): void {
    this._marked[v] = true
    for (const w of G.adj(v)) {
      if (!this._marked[w]) this.dfs(G, w)
    }
  }

  marked(w: number): boolean {
    return this._marked[w]
  }
}
