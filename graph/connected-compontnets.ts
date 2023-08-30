import { Queue } from "../queue/queue"
import { Graph } from "./graph"

export class ConnectedComponents {
  private marked: boolean[]
  private count: number = 0
  private ids: number[]

  constructor(G: Graph) {
    this.ids = Array.from({ length: G.V() })
    this.marked = Array.from({ length: G.V() }, () => false)

    for (let s = 0; s < G.V(); s++) {
      if (this.marked[s]) continue
      this.dfs(G, s)
      this.count++
    }
  }

  private dfs(G: Graph, v: number) {
    this.marked[v] = true
    this.ids[v] = this.count

    for (let w of G.adj(v)) {
      if (this.marked[w]) continue
      this.dfs(G, w)
    }
  }

  connected(v: number, w: number): boolean {
    return this.id(v) === this.id(w)
  }

  getCount(): number {
    return this.count
  }

  id(v: number): number {
    return this.ids[v]
  }
}

;(async () => {
  await main()
})()

async function main(): Promise<void> {
  const g = await Graph.ininialize("tinyG.txt")
  const cc = new ConnectedComponents(g)
  // console.log(cc.toString())

  const M = cc.getCount()
  console.log(M + " components")

  const components: Queue<number>[] = Array.from(
    { length: M },
    () => new Queue<number>()
  )

  for (let v = 0; v < g.V(); v++) {
    components[cc.id(v)].enqueue(v)
  }

  for (let i = 0; i < M; i++) {
    let str = ""
    for (let v of components[i]) {
      str += v + " "
    }
    console.log(str)
  }
}
