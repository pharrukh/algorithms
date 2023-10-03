import { createReadStream, writeFileSync } from "fs"
import { createInterface } from "readline"
import { Readline } from "readline/promises"
import { Queue } from "../queue/queue"
import { Stack } from "../stack/stack"

class BagNode<T> {
  next: BagNode<T> | null
  constructor(public val: T) {}
}

class Bag<T> {
  size = 0
  private first: BagNode<T> | null

  isEmpty(): boolean {
    return this.size === 0
  }

  add(item: T) {
    const node = new BagNode(item)
    if (this.isEmpty()) this.first = node
    else {
      const oldFirst = this.first
      this.first = node
      this.first.next = oldFirst
    }
    this.size++
  }

  private *iterator() {
    let node = this.first
    while (node) {
      yield node.val
      node = node.next
    }
  }

  [Symbol.iterator]() {
    return this.iterator()
  }
}

class Graph {
  V = 0
  E = 0
  adj: Bag<number>[]

  addEdge(v: number, w: number): void {
    this.adj[v].add(w)
    this.adj[w].add(v)
    this.E++
  }

  constructor(V: number, edges: [number, number][] = []) {
    this.V = V
    this.adj = Array.from({ length: V }, () => new Bag<number>())

    for (const [p, q] of edges) {
      this.addEdge(p, q)
    }
  }
}

class SymbolGraph {
  G: Graph
  keyMap = new Map<string, number>()
  keys: string[] = []

  contains(key: string): boolean {
    return this.keyMap.has(key)
  }

  name(v: number): string {
    return this.keys[v]
  }

  index(key: string): number {
    return this.keyMap.get(key)
  }

  static async init(path: string, separtor: string): Promise<SymbolGraph> {
    const sg = new SymbolGraph()
    function getLineIterator(path: string) {
      const fileStream = createReadStream(path)
      const rl = createInterface({ input: fileStream })
      const iterator = rl[Symbol.asyncIterator]()
      return iterator
    }

    let i = 0
    const add = (key: string, v: number) => {
      sg.keyMap.set(key, v)
      sg.keys[v] = key
    }

    const addInc = (key: string) => add(key, i++)

    for await (const line of getLineIterator(path)) {
      const [movie, ...actors] = line.split(separtor)
      addInc(movie)
      actors.forEach(addInc)
    }

    const g = new Graph(sg.keys.length)

    for await (const line of getLineIterator(path)) {
      const [movie, ...actors] = line.split(separtor)
      actors.forEach((actor) => {
        const v = sg.index(movie)
        const w = sg.index(actor)
        g.addEdge(v, w)
      })
    }

    sg.G = g

    return sg
  }
}

function getTwoColor(G: Graph, s: number): boolean[] {
  const colors = Array.from({ length: G.V }, () => false)
  const marked = Array.from({ length: G.V }, () => false)

  const stack = new Stack<number>()
  stack.push(s)

  while (!stack.isEmpty()) {
    const v = stack.pop()

    marked[v] = true
    for (const w of G.adj[v]) {
      if (!marked[w]) {
        colors[w] = !colors[v]
        stack.push(w)
      } else if (colors[w] === colors[v]) {
        throw new Error("Oups, this graph is bipartite!")
      }
    }
  }

  return colors
}

function getDistance(G: Graph, s: number): number[] {
  const distTo = Array.from({ length: G.V }, () => Infinity)
  distTo[s] = 0
  const marked = Array.from({ length: G.V }, () => false)

  const q = new Queue<number>()
  q.enqueue(s)
  marked[s] = true

  while (!q.isEmpty()) {
    const v = q.dequeue()
    for (const w of G.adj[v]) {
      if (marked[w]) continue
      distTo[w] = distTo[v] + 1
      marked[w] = true
      q.enqueue(w)
    }
  }

  return distTo
}

function getHistData(dists: number[]): number[] {
  const counter = new Map<number, number>()
  let max = -Infinity

  for (const d of dists) {
    const b = d / 2
    if (counter.has(b)) counter.set(b, counter.get(b) + 1)
    else counter.set(b, 1)
    max = Math.max(max, b)
  }

  const hist = []
  for (let i = 0; i < max; i++) {
    hist[i] = counter.get(i) || 0
  }

  return hist
}

;(async () => {
  const sg = await SymbolGraph.init("movies.txt", "/")
  const g = sg.G
  const kevinBaconKey = "Bacon, Kevin"
  if (!sg.contains(kevinBaconKey))
    throw new Error("The symbol graph does not have the key.")

  const s = sg.index(kevinBaconKey)
  const colors = getTwoColor(g, s)
  const dists = getDistance(g, s)
  const actorDists = dists.filter((_, i) => colors[i] === false)
  const noConnectionActorsCount = actorDists.filter(
    (d) => d === Infinity
  ).length
  console.log(noConnectionActorsCount)
  const hist = getHistData(actorDists.filter((d) => d !== Infinity))
  console.log(hist)
  
  /// [1,1324,70717,40862,1591] + 88341
  /// 0 - 1, Kevin himself
  /// 1 - 1324
  /// 2 - 70717
  /// 3 - 40862
  /// 4 - 1591
  /// ∞ - 88341
})()
