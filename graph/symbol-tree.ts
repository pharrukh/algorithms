import { createReadStream } from "fs"
import { Graph } from "./graph"
import { createInterface, moveCursor } from "readline"
import { BreadthFirstPath } from "./breadth-first-path"

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

    while (!line.done) {
      const [movie, ...actors] = line.value.split(separator)
      addIfNeeded(movie)
      actors.forEach(addIfNeeded)
      line = await iterator.next()
    }

    const g = new Graph(sg.keys.length)
    const fs2 = createReadStream(path)
    const rl2 = createInterface({
      input: fs2,
      crlfDelay: Infinity,
    })

    const iterator2 = rl2[Symbol.asyncIterator]()
    line = await iterator2.next()
    while (!line.done) {
      const [movie, ...actors] = line.value.split(separator)
      for (const actor of actors) {
        const v = sg.keyMap.get(movie)
        const w = sg.keyMap.get(actor)
        g.addEdge(v, w)
      }
      line = await iterator2.next()
    }
    sg.G = g

    return sg
  }
}

;(async () => {
  const sg = await SymbolGraph.init("./movies.txt", "/")
  console.log("V:", sg.G.V(), " E:", sg.G.E())
  const g = sg.G
  const source = "Bacon, Kevin"
  if (!sg.contains(source))
    throw new Error(`The symbol graph does not have "${source}"`)

  const s = sg.index(source)
  const bfs = new BreadthFirstPath(g, s)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  for await (const sink of rl) {
    if (sg.contains(sink)) {
      const t = sg.index(sink)
      if (bfs.hasPathTo(t)) {
        for (const v of bfs.pathTo(t)) {
          console.log("   " + sg.name(v))
        }
      } else {
        console.log("Not connected")
      }
    } else {
      console.log("   Not in database.")
    }
  }

  rl.close()
})()
