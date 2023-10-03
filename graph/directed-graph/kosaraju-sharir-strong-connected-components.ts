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
        this.dfs(v)
        this.count++
      }
    }
  }

  private dfs(v: number): void {
    this.ids[v] = this.count
    this.marked[v] = true

    for (const w of this.G.adj(v)) {
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

console.log("direct order")
const g = getSafiaDiraph()
const dfo = new DepthFirstOrder(g)
const scc = new KosarajuSharirSCC(g)
console.log("reversed postorder ", Array.from(dfo.reversePostOrder()).join(" "))
console.log(`${scc.count} strong components`)
for (let i = 0; i < scc.count; i++) {
  const component = []
  for (let v = 0; v < g.V(); v++) {
    if (scc.ids[v] === i) component.push(v)
  }
  console.log(component.join(" "))
}

console.log("reversed order")
const reversedG = getSafiaDiraph().reverse()
const dfo2 = new DepthFirstOrder(reversedG)
const scc2 = new KosarajuSharirSCC(reversedG)
console.log(
  "reversed postorder ",
  Array.from(dfo2.reversePostOrder()).join(" ")
)
console.log(`${scc2.count} strong components`)
for (let i = 0; i < scc2.count; i++) {
  const component = []
  for (let v = 0; v < g.V(); v++) {
    if (scc2.ids[v] === i) component.push(v)
  }
  console.log(component.join(" "))
}

;(async () => {
  const kristina = await Digraph.ininialize("data/mediumDG.txt")
  console.log(kristina.toString())
  const scc2 = new KosarajuSharirSCC(kristina)
  console.log(`${scc2.count} strong components`)
  for (let i = 0; i < scc2.count; i++) {
    const component = []
    for (let v = 0; v < kristina.V(); v++) {
      if (scc2.ids[v] === i) component.push(v)
    }
    console.log(component.join(" "))
  }

  // 4.2.19
  const ilhomDAG = getIslomDAG()

  const scc3 = new KosarajuSharirSCC(ilhomDAG)
  console.log(`${scc3.count} strong components`)

  for (let i = 0; i < scc3.count; i++) {
    const component = []
    for (let v = 0; v < ilhomDAG.V(); v++) {
      if (scc3.ids[v] === i) component.push(v)
    }
    console.log(component.join(" "))
  }

  // 4.2.20
  const kristina2 = await Digraph.ininialize("data/mediumDG.txt")
  const { reversePost } = new DepthFirstOrder(kristina2.reverse())
  const { post } = new DepthFirstOrder(kristina2)

  console.log(`Reverse PostOrder of Graph Reverse`)
  console.log(Array.from(reversePost).join(" "))
  console.log(`PostOrder of Graph`)
  console.log(Array.from(post).join(" "))

  // 4.2.21
  const safia = getSafiaDiraph()
  const { post: post1 } = new DepthFirstOrder(safia)
  const { post: post2 } = new DepthFirstOrder(safia.reverse())
  console.log("Post Order of the Graph")
  console.log(Array.from(post1).join(" "))
  console.log("Post Order of the Graph Reverse")
  console.log(Array.from(post2).join(" "))
})()
