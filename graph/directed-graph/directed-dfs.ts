import { Digraph } from "./digraph"

export class DirectedDFS {
  private _marked: boolean[]

  constructor(G: Digraph, v: number) {
    this._marked = Array.from({ length: G.V() }, () => false)
    this.dfs(G, v)
  }

  dfs(G: Digraph, v: number): void {
    if (this._marked[v]) return
    this._marked[v]
    for (const w of G.adj(v)) {
      if (!this._marked[w]) this.dfs(G, w)
    }
  }

  marked(w: number): boolean {
    return this._marked[w]
  }
}
