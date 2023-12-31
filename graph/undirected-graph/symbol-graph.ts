import { createReadStream } from "fs"
import { Graph } from "./graph"
import { createInterface, moveCursor } from "readline"
import { Edge } from "./types"

export class SymbolGraph {
  keyMap: Map<string, number> = new Map()
  keys: string[] = []
  G: Graph

  contains(key: string): boolean {
    return this.keyMap.has(key)
  }
  name(v: number): string {
    return this.keys[v]
  }
  index(key: string): number {
    return this.keyMap.get(key)
  }

  static async init(path: string, separator: string) {
    const sg = new SymbolGraph()
    const fs = createReadStream(path)

    const rl = createInterface({
      input: fs,
      crlfDelay: Infinity,
    })

    const iterator = rl[Symbol.asyncIterator]()
    let line = await iterator.next()
    let i = 0

    const addIfNeeded = (key: string): void => {
      if (sg.contains(key)) return
      sg.keyMap.set(key, i)
      sg.keys[i++] = key
    }

    const g = new Graph()
    while (!line.done) {
      const [movie, ...actors] = line.value.split(separator)
      addIfNeeded(movie)
      actors.forEach(addIfNeeded)

      const v = sg.index(movie)
      g.addVertex(v)
      for (let actor of actors) {
        const w = sg.index(actor)
        if (!g.hasVertex(w)) g.addVertex(w)
        g.addEdge(v, w)
      }

      line = await iterator.next()
    }

    sg.G = g

    return sg
  }

  constructor(set: Set<Edge> = null) {
    if (set === null) return

    let i = 0
    for (const edge of set) {
      const [key1, key2] = edge.split("__")
      if (!this.keyMap.has(key1)) {
        this.keyMap.set(key1, i)
        this.keys[i] = key1
        i++
      }

      if (!this.keyMap.has(key2)) {
        this.keyMap.set(key2, i)
        this.keys[i] = key2
        i++
      }

      // console.log(edge, this.keyMap, this.keys)
    }

    this.G = new Graph(this.keys.length)

    for (const edge of set) {
      const [key1, key2] = edge.split("__")
      const v = this.index(key1)
      const w = this.index(key2)
      this.G.addEdge(v, w)
    }
  }
}

// ;(async () => {
//   const sg = await SymbolGraph.init("./movies.txt", "/")
//   console.log("V:", sg.G.V(), " E:", sg.G.E())
//   const g = sg.G
//   const source = "Bacon, Kevin"
//   if (!sg.contains(source))
//     throw new Error(`The symbol graph does not have "${source}"`)

//   const s = sg.index(source)
//   const bfs = new BreadthFirstPath(g, s)

//   const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   })

//   for await (const sink of rl) {
//     if (sg.contains(sink)) {
//       const t = sg.index(sink)
//       if (bfs.hasPathTo(t)) {
//         for (const v of bfs.pathTo(t)) {
//           console.log("   " + sg.name(v))
//         }
//       } else {
//         console.log("Not connected")
//       }
//     } else {
//       console.log("   Not in database.")
//     }
//   }

//   rl.close()
// })()
