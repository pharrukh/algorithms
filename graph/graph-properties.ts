import { Queue } from "../queue/queue"
import { Graph } from "./graph"
type PathKey = `${number}-${number}`
export class GraphProperties {
  private ecc: Map<number, number> = new Map() // eccentricity
  private pairDists: Map<PathKey, number> = new Map()
  private distTo: number[] = []
  private edgeTo: number[] = []

  public diameter: number = -Infinity
  public radius: number = Infinity
  public center: number
  public wienerIndex: number

  constructor(G: Graph) {
    for (let v = 0; v < G.V(); v++) {
      this.ecc.set(v, 0)
      this.distTo[v] = 0
      this.edgeTo[v] = null
    }

    const isAdded = (v: number, w: number) =>
      [`${v}-${w}`, `${w}-${v}`].some((key: PathKey) => this.pairDists.has(key))

    for (let v = 0; v < G.V(); v++) {
      this.bfs(G, v)
      for (let w = 0; w < G.V(); w++) {
        if (w !== v) {
          const e = this.distTo[w]
          if (!isAdded(v, w)) this.pairDists.set(`${v}-${w}`, e)
          this.ecc.set(v, Math.max(e, this.ecc.get(v) || 0))
          this.ecc.set(w, Math.max(e, this.ecc.get(w) || 0))
        }
      }
    }

    for (let [v, e] of this.ecc) {
      this.diameter = Math.max(this.diameter, e)
      if (this.radius > e) {
        this.radius = e
        this.center = v
      }
    }

    // console.log(this.pairDists)
    const distances = Array.from(this.pairDists.values())
    this.wienerIndex = distances.reduce((acc, a) => acc + a, 0)
  }

  private bfs(G: Graph, s: number): void {
    const marked = Array.from({ length: G.V() }, () => false)

    const q = new Queue<number>()
    q.enqueue(s)
    marked[s] = true
    this.distTo[s] = 0

    while (!q.isEmpty()) {
      const v = q.dequeue()
      for (let w of G.adj(v)) {
        if (marked[w]) continue
        this.distTo[w] = this.distTo[v] + 1
        marked[w] = true
        this.edgeTo[w] = v
        q.enqueue(w)
      }
    }
  }

  toString(): string {
    return `
    Graph Properties:
      diameter: ${this.diameter}
      radius: ${this.radius}
      center: ${this.center}
      wiener index: ${this.wienerIndex}
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
