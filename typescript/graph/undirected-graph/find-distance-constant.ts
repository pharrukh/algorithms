import { Queue } from "../../queue/queue"
import { Graph } from "./graph"

let distTo
export function bfp(G: Graph, s: number): void {
  distTo = Array.from({ length: G.V() }, () => Infinity)
  const marked = Array.from({ length: G.V() }, () => false)
  const edgeTo = Array.from({ length: G.V() }, () => null)

  const q = new Queue<number>()
  q.enqueue(s)
  marked[s] = true
  distTo[s] = 0

  while (!q.isEmpty()) {
    const v = q.dequeue()
    for (let w of G.adj(v)) {
      if (marked[w]) continue
      edgeTo[w] = v
      marked[w] = true
      distTo[w] = distTo[v] + 1
      q.enqueue(w)
    }
  }
}

const g = new Graph(6)
const edges = [
  [0, 1],
  [0, 2],
  [0, 5],
  [1, 3],
  [1, 2],
  [2, 5],
  [2, 3],
  [3, 4],
  [5, 4],
]
edges.forEach(([p, q]) => g.addEdge(p, q))
bfp(g, 0)
for(let v = 0; v < g.V(); v++) {
  console.log(`from ${v} to 0 - ${distTo[v]}`)
}
