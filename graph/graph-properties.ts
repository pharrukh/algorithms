import { Queue } from "../queue/queue"
import { Graph } from "./graph"

export class GraphProperties {
  private ecc: number[] // eccentricity

  public diameter: number
  public radius: number
  public center: number

  constructor(G: Graph) {
    this.ecc = Array.from({ length: G.V() }, () => null)
    for (let v = 0; v < G.V(); v++) this.bfs(G, v)
    this.diameter = Math.max(...this.ecc)
    this.radius = Math.min(...this.ecc)
    this.center = this.ecc.indexOf(this.radius)
  }

  private bfs(G: Graph, s: number): void {
    const marked = Array.from({ length: G.V() }, () => false)
    const distTo = Array.from({ length: G.V() }, () => 0)
    const q = new Queue<number>()
    q.enqueue(s)
    marked[s] = true
    distTo[s] = 0
    let maxEcc = 0

    while (!q.isEmpty()) {
      const v = q.dequeue()
      for (let w of G.adj(v)) {
        if (marked[w]) continue
        distTo[w] = distTo[v] + 1
        marked[w] = true
        q.enqueue(w)

        maxEcc = Math.max(maxEcc, distTo[w])
      }
    }

    this.ecc[s] = maxEcc
  }

  toString(): string {
    return `
    Graph Properties:
      diameter: ${this.diameter}
      radius: ${this.radius}
      center: ${this.center}
    `
  }
}

const g = new Graph(6)
const edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
  [4, 5],
]
edges.forEach(([p, q]) => g.addEdge(p, q))
console.log(new GraphProperties(g).toString())

// 0 -- 1 -- 2 -- 3 -- 4 -- 5 -- 6 -- 7 -- 8 -- 9 -- 10
const g2 = new Graph(11)
const edges2 = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
]
edges2.forEach(([p, q]) => g2.addEdge(p, q))
console.log(new GraphProperties(g2).toString())