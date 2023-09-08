import { Queue } from "../queue/queue"
import { Graph } from "./graph"

class ConnectedComponents {
  private marked: boolean[]
  ids: number[]
  components: number[][]
  private count: number = 0

  constructor(G: Graph) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.components = Array.from({ length: G.V() }, () => [])
    this.ids = Array.from({ length: G.V() }, () => null)

    for (let v = 0; v < G.V(); v++) {
      if (this.marked[v]) continue
      this.dfs(G, v)
      this.count++
    }
  }

  private dfs(G: Graph, v: number): void {
    this.components[this.count].push(v)
    this.ids[v] = this.count
    this.marked[v] = true

    for (let w of G.adj(v)) {
      if (this.marked[w]) continue
      this.dfs(G, w)
    }
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
  const g = await Graph.ininialize("tinyGex2.txt")
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
