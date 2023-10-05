import { Queue } from "../../queue/queue"
import { Stack } from "../../stack/stack"
import { Graph } from "./graph"
import { Paths } from "./types"

export class BreadthFirstPath implements Paths {
  private marked: boolean[]
  private edgeTo: number[]
  private readonly s: number

  constructor(G: Graph, s: number) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.edgeTo = Array.from({ length: G.V() })

    this.bfs(G, s)
  }

  private bfs(G: Graph, s: number): void {
    const q = new Queue<number>()
    q.enqueue(s)
    this.marked[s] = true

    while (!q.isEmpty()) {
      const v = q.dequeue()
      for (let w of G.adj(v)) {
        if (this.isMarked(w)) continue
        this.edgeTo[w] = v
        this.marked[w] = true
        q.enqueue(w)
      }
    }
  }

  private isMarked(w: number) {
    return this.marked[w]
  }

  hasPathTo(v: number): boolean {
    return this.marked[v]
  }

  pathTo(v: number): Iterable<number> {
    const stack = new Stack<number>()
    for (let x = v; x != this.s; x = this.edgeTo[x]) {
      stack.push(x)
    }
    return stack
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

// ;(async () => {
//   await main(0)
//   await main(3)
// })()

// async function main(s: number): Promise<void> {
//   const g = await Graph.ininialize("tinyCG.txt")
//   const search = new BreadthFirstPath(g, s)
//   console.log(search.toString())

//   let str = ""
//   for (let v = 0; v < g.V(); v++) {
//     str += s + " to " + v + ": "
//     if (search.hasPathTo(v)) {
//       for (let x of search.pathTo(v)) {
//         if (x === s) str += x
//         else str += "-" + x
//       }
//     }
//     str += "\n"
//   }

//   console.log(str)
// }
