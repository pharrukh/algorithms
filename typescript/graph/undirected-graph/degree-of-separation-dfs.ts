import { createReadStream } from "fs"
import { BreadthFirstPath } from "./breadth-first-path"
import { SymbolGraph } from "./symbol-graph"
import { createInterface } from "readline"
;import { DepthFirstPath } from "./depth-first-path";
(async () => {
  const args = process.argv.slice(2)
  const [path, separator, source] = args

  const sg = await SymbolGraph.init(path, separator)
  if (!sg.contains(source)) console.log(`Graph does not contain ${source}`)

  const dfp = new DepthFirstPath(sg.G, sg.index(source))

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const iterator = rl[Symbol.asyncIterator]()
  let line = await iterator.next()

  while (!line.done) {
    const input = line.value
    if (input === "exit") process.exit(0)

    if (!sg.contains(input)) {
      line = await iterator.next()
      continue
    }

    if (!dfp.hasPathTo(sg.index(input))) {
      console.log(`Graph does not have a path from ${source} to ${input}`)
      line = await iterator.next()
      continue
    }

    const path = dfp.pathTo(sg.index(input))
    for (let item of path) {
      console.log("  ", sg.name(item))
    }

    line = await iterator.next()
  }
})()