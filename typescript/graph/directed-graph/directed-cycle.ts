import { Stack } from "../../stack/stack"
import { Digraph } from "./digraph"

export class DirectedCycle {
  #cycle: Stack<number>
  #edgeTo: number[]
  #marked: boolean[]
  #onStack: boolean[]

  constructor(private G: Digraph) {
    this.#marked = Array.from({ length: G.V() }, () => false)
    this.#onStack = Array.from({ length: G.V() }, () => false)
    this.#edgeTo = Array.from({ length: G.V() }, () => null)

    for (let v = 0; v < G.V(); v++) {
      this.#dfs(v)
    }
  }

  #dfs(v: number): void {
    this.#marked[v] = true
    this.#onStack[v] = true

    for (const w of this.G.adj(v)) {
      if (this.hasCycle()) return
      else if (!this.#marked[w]) {
        this.#edgeTo[w] = v
        this.#dfs(w)
      } else if (this.#onStack[w]) {
        this.#cycle = new Stack()
        for (let u = v; u !== w; u = this.#edgeTo[u]) {
          this.#cycle.push(u)
        }
        this.#cycle.push(w)
        this.#cycle.push(v)
      }
    }

    this.#onStack[v] = false
  }

  hasCycle(): boolean {
    return this.#cycle !== undefined
  }

  getCycle(): Iterable<number> {
    if (!this.#cycle) throw new Error("The graph does not have a cycle!")
    return this.#cycle
  }
}

// ;(async () => {
//   const graph = await Digraph.ininialize("./data/tinyDGex2.txt")
//   const cycleFinder = new DirectedCycle(graph)
//   if (cycleFinder.hasCycle()) {
//     console.log("I have found a cycle.")
//     console.log(Array.from(cycleFinder.getCycle()).join("->"))
//   }
// })()
