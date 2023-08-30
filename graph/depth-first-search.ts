import { Graph } from "./graph"

interface Search {
  isMarked(v: number): boolean // vertex
  getCount(): number
}

export class DepthFirstSearch implements Search {
  private marked: boolean[]
  private count: number

  constructor(G: Graph, s: number) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.count = 0
    this.dfs(G, s)
  }

  private dfs(G: Graph, v: number): void {
    this.marked[v] = true
    this.count++

    for (let w of G.adj(v)) {
      if (!this.isMarked(w)) this.dfs(G, w)
    }
  }

  isMarked(w: number): boolean {
    return this.marked[w]
  }

  getCount(): number {
    return this.count
  }

  toString(): string {
    return `${this.marked} (${this.count})`
  }
}

;(async () => {
  await main(0)
  await main(9)
})()

async function main(s: number): Promise<void> {
  const g = await Graph.ininialize("tinyG.txt")
  const search = new DepthFirstSearch(g, s)
  // console.log(g.toString())
  // console.log(search.toString())

  let str = ""
  for (let v = 0; v < g.V(); v++) {
    if (search.isMarked(v)) str += v + " "
  }
  str += "\n"

  if (search.getCount() !== g.V()) str += "NOT "
  str += "connected"

  console.log(str)
}
