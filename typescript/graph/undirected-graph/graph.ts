import { createReadStream } from "node:fs"
import { createInterface } from "node:readline"
import { Bag } from "../../bag/bag"

export class Graph {
  private vCount: number
  private eCount: number
  private adjList: Bag<number>[]

  constructor(V: number = 0) {
    this.vCount = V
    this.eCount = 0
    this.adjList = Array.from({ length: V }, () => new Bag<number>())
  }

  V(): number {
    return this.vCount
  }

  E(): number {
    return this.eCount
  }

  static async ininialize(path: string): Promise<Graph> {
    const fileStream = createReadStream(path)

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    const iterator = rl[Symbol.asyncIterator]()
    const line1 = await iterator.next()
    const line2 = await iterator.next()

    const graph = new Graph(parseInt(line1.value))
    const E = parseInt(line2.value)

    for (let i = 0; i < E; i++) {
      const nextLine = await iterator.next()
      const nums = nextLine.value.split(" ")
      const v = parseInt(nums[0])
      const w = parseInt(nums[1])
      graph.addEdge(v, w)
    }

    return graph
  }

  static async initializeFromAdjLists(path: string): Promise<Graph> {
    const fileStream = createReadStream(path)
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    const iterator = rl[Symbol.asyncIterator]()
    const line1 = await iterator.next()
    const line2 = await iterator.next()

    const graph = new Graph(parseInt(line1.value))
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
    this.adjList[w].add(v)
    this.eCount++
  }

  removeEdge(v: number, w: number): void {
    if (!this.hasEdge(v, w))
      throw new Error(`The edge (${v}-${w}) does not exist!`)
    this.adjList[v].remove(w)
    this.adjList[w].remove(v)
    this.eCount--
  }

  adj(v: number): Bag<number> {
    return this.adjList[v]
  }

  degree(v: number): number {
    return this.adjList[v].size
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
    let str = ""
    for (let i = 0; i < this.vCount; i++) {
      const bag = this.adjList[i]
      str += `${i} : ${bag.toString()}\n`
    }
    return str
  }
}

// ;(async () => {
//   const graph = await Graph.initializeFromAdjLists("tinyGadj.txt")
//   console.log(graph.toString())
// })()
