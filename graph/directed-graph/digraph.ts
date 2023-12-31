import { createReadStream } from "node:fs"
import { createInterface } from "node:readline"
import { Bag } from "../../bag/bag"

export class Digraph {
  private vCount: number
  private eCount: number
  private adjList: Bag<number>[]
  private indegreeList: number[]

  constructor(V: number = 0) {
    this.vCount = V
    this.eCount = 0
    this.adjList = Array.from({ length: V }, () => new Bag<number>())
    this.indegreeList = Array.from({ length: V }, () => 0)
  }

  V(): number {
    return this.vCount
  }

  E(): number {
    return this.eCount
  }

  static async ininialize(path: string): Promise<Digraph> {
    const fileStream = createReadStream(path)

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    const iterator = rl[Symbol.asyncIterator]()
    const line1 = await iterator.next()
    const line2 = await iterator.next()

    const graph = new Digraph(parseInt(line1.value))
    const E = parseInt(line2.value)

    for (let i = 0; i < E; i++) {
      const nextLine = await iterator.next()
      const nums = nextLine.value.split(" ").filter((str) => str !== "")
      const v = parseInt(nums[0].trim())
      const w = parseInt(nums[1].trim())
      graph.addEdge(v, w)
    }

    return graph
  }

  static async initializeFromAdjLists(path: string): Promise<Digraph> {
    const fileStream = createReadStream(path)
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    const iterator = rl[Symbol.asyncIterator]()
    const line1 = await iterator.next()
    const line2 = await iterator.next()

    const graph = new Digraph(parseInt(line1.value))
    const E = parseInt(line2.value)

    let i = 0
    while (i < E) {
      const nextLine = await iterator.next()
      const [v, ...adjList] = nextLine.value.split(" ").map((n) => parseInt(n))
      for (let w of adjList) {
        graph.addEdge(v, w)
        i++
      }
    }

    return graph
  }

  hasVertex(v: number): boolean {
    return v < this.V()
  }

  addVertex(v: number): void {
    if (v !== this.V())
      throw new Error(`${v} not the next vertex ${this.vCount}`)
    this.adjList[v] = new Bag<number>()
    this.vCount++
  }

  addEdge(v: number, w: number): void {
    const error = `There are only ${this.V()} vertices, you are passing an edge [${v}, ${w}]`
    if (v >= this.V() || w >= this.V()) throw new Error(error)

    this.adjList[v].add(w)
    this.indegreeList[w]++
    this.eCount++
  }

  removeEdge(v: number, w: number): void {
    if (!this.hasEdge(v, w))
      throw new Error(`The edge (${v}-${w}) does not exist!`)
    this.adjList[v].remove(w)
    this.indegreeList[w]--
    this.eCount--
  }

  reverse(): Digraph {
    const R = new Digraph(this.V())
    for (let v = 0; v < this.V(); v++) {
      for (const w of this.adj(v)) {
        R.addEdge(w, v)
      }
    }
    return R
  }

  adj(v: number): Bag<number> {
    return this.adjList[v]
  }

  outdegree(v: number): number {
    return this.adjList[v].size
  }

  indegree(v: number): number {
    return this.indegreeList[v]
  }

  hasEdge(v: number, w: number): boolean {
    return this.adjList[v].has(w)
  }

  private *iterator() {
    let i = 0
    while (i < this.V()) yield i++
  }

  [Symbol.iterator]() {
    return this.iterator()
  }

  toString(): string {
    let str = `V:${this.V()}\nE:${this.E()}\n`
    for (let i = 0; i < this.vCount; i++) {
      const bag = this.adjList[i]
      str += `${i} : ${bag.toString()}\n`
    }
    return str
  }

  clone(): Digraph {
    const copy = new Digraph(this.V())
    for (let v = 0; v < this.V(); v++) {
      for (const w of this.adj(v)) {
        copy.addEdge(v, w)
      }
    }
    return copy
  }

  // source is a vertice that has indegree zero
  sources(): number[] {
    const sources = []
    for (let v = 0; v < this.V(); v++) {
      if (this.indegree(v) === 0) sources.push(v)
    }
    return sources
  }
}

// ;(async () => {
//   const graph = await Digraph.ininialize("./data/tinyDGex2.txt")
//   console.log(graph.toString())
// })()
