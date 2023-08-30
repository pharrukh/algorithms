import { Stack } from "../stack/stack"
import { Graph } from "./graph"

interface Paths {
  hasPathTo(v: number): boolean
  pathTo(v: number): Iterable<number>
}

export class DepthFirstPath implements Paths {
  private edgeTo: number[]
  private marked: boolean[]

  constructor(G: Graph, private s: number) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.edgeTo = Array.from({ length: G.V() })

    this.dfs(G, s)
  }

  private dfs(G: Graph, v: number) {
    this.marked[v] = true

    for (let w of G.adj(v)) {
      if (this.marked[w]) continue
      this.edgeTo[w] = v
      this.dfs(G, w)
    }
  }

  hasPathTo(v: number): boolean {
    return this.marked[v]
  }

  pathTo(v: number): Iterable<number> {
    if (!this.hasPathTo(v)) return null
    const path = new Stack<number>()
    for (let x = v; x != this.s; x = this.edgeTo[x]) path.push(x)
    path.push(this.s)
    return path
  }

  toString(): string {
    let str = ""
    for (let i = 0; i < this.edgeTo.length; i++) {
      const to = this.edgeTo[i] === undefined ? "-" : this.edgeTo[i]
      str += `${i} | ${to}\n`
    }
    return str
  }
}

;(async () => {
  await main(0)
  await main(3)
})()

async function main(s: number): Promise<void> {
  const g = await Graph.ininialize("tinyCG.txt")
  const search = new DepthFirstPath(g, s)
  // console.log(g.toString())
  console.log(search.toString())

  let str = ""
  for (let v = 0; v < g.V(); v++) {
    str += s + " to " + v + ": "
    if (search.hasPathTo(v)) {
      for (let x of search.pathTo(v)) {
        if (x === s) str += x
        else str += "-" + x
      }
    }
    str += "\n"
  }

  console.log(str)
}
