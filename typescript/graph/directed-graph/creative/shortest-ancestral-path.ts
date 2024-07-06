import { Queue } from "../../../queue/queue"
import { Stack } from "../../../stack/stack"
import { Digraph } from "../digraph"

/**  Following the definition of shortest anscetral path:
 *   (1) it is a common ancestor x
 *   (2) shortest directed path from v to x
 *   (3) shortest directed path from w to x
 */
export type SAP = {
  x: number
  pathFromV: Iterable<number>
  pathFromW: Iterable<number>
}

function getPathFrom(s: number, x: number, edgeTo: number[]): Iterable<number> {
  const path = new Stack<number>()

  for (let v = x; v != s; v = edgeTo[v]) {
    path.push(v)
  }

  path.push(s)
  return path
}

export function getShortestAncestralPath(G: Digraph, v: number, w: number): SAP {
  const edgeToV = Array.from({ length: G.V() }, () => null)
  const edgeToW = Array.from({ length: G.V() }, () => null)
  const heightToV = Array.from({ length: G.V() }, () => null)
  const heightToW = Array.from({ length: G.V() }, () => null)

  const R = G.reverse()
  function bfs(g: Digraph, u: number, edgeTo: number[], heightTo: number[]): void {
    const marked = Array.from({ length: G.V() }, () => false)
    marked[u] = true // TODO: do we need this?
    heightTo[u] = 0

    const q = new Queue<number>()
    q.enqueue(u)

    while (!q.isEmpty()) {
      const p = q.dequeue()
      marked[p] = true

      for (const m of g.adj(p)) {
        if (marked[m]) continue
        heightTo[m] = heightTo[p] + 1
        edgeTo[m] = p
        q.enqueue(m)
      }
    }
  }
  bfs(R, v, edgeToV, heightToV)
  bfs(R, w, edgeToW, heightToW)

  let minH = Infinity
  let x = null

  for (let u = 0; u < R.V(); u++) {
    if (u === v || u === w) continue
    if (edgeToV[u] === null || edgeToW[u] === null) continue
    const h = heightToV[u] + heightToW[u]
    if (h < minH) {
      minH = h
      x = u
    }
  }

  if (x === null) {
    return { x: null, pathFromV: null, pathFromW: null }
  }

  return { x, pathFromV: getPathFrom(v, x, edgeToV), pathFromW: getPathFrom(w, x, edgeToW) }
}

function test(G: Digraph, v: number, w: number, expected: number): void {
  const { x, pathFromV, pathFromW } = getShortestAncestralPath(G, v, w)
  if (expected === null) {
    console.log(`Should give (${expected}) for (${v}) and (${w}): (${x}) ${pathFromV} ${pathFromW}`)
    return
  }

  const printPath = (iteratorable: Iterable<number>) => Array.from(iteratorable).join("=>")
  console.log(
    `Should give (${expected}) for (${v}) and (${w}): (${x}) ${printPath(pathFromV)} ${printPath(
      pathFromW
    )}`
  )
}

const digraph1 = new Digraph(5)
digraph1.addEdge(0, 1)
digraph1.addEdge(1, 2)
digraph1.addEdge(0, 3)
digraph1.addEdge(3, 4)

test(digraph1, 2, 4, 0)

const digraph2 = new Digraph(5)
digraph2.addEdge(0, 1)
digraph2.addEdge(0, 2)
digraph2.addEdge(2, 3)
digraph2.addEdge(2, 4)
test(digraph2, 3, 4, 2)

const digraph3 = new Digraph(9)
digraph3.addEdge(0, 1)
digraph3.addEdge(1, 2)
digraph3.addEdge(1, 3)

digraph3.addEdge(4, 5)
digraph3.addEdge(5, 6)
digraph3.addEdge(6, 8)
digraph3.addEdge(6, 7)
digraph3.addEdge(7, 2)
digraph3.addEdge(8, 3)

test(digraph3, 2, 3, 1)

const digraph4 = new Digraph(9)
digraph4.addEdge(0, 1)
digraph4.addEdge(1, 3)
digraph4.addEdge(1, 4)
digraph4.addEdge(4, 5)
digraph4.addEdge(5, 6)
digraph4.addEdge(6, 2)

digraph4.addEdge(7, 8)
digraph4.addEdge(8, 3)
digraph4.addEdge(7, 2)

test(digraph4, 3, 2, 7)
test(digraph4, 7, 2, null)
