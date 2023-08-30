import { Bag } from "../bag/bag"
import { createReadStream } from "node:fs"
import { createInterface } from "node:readline"

export class Graph {
  private readonly vCount: number
  private eCount: number
  private adjList: Bag<number>[]

  constructor(V: number) {
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

  addEdge(v: number, w: number): void {
    this.adjList[v].add(w)
    this.adjList[w].add(v)
    this.eCount++
  }

  adj(v: number): Iterable<number> {
    return this.adjList[v]
  }

  toString(): string {
    let str = ""
    for (let i = 0; i < this.eCount; i++) {
      const bag = this.adjList[i]
      str += `${i} : ${bag.toString()}\n`
    }
    return str
  }
}

// ;(async () => {
//   const graph = await Graph.ininialize("tinyG.txt")
//   console.log(graph.toString())
// })()
