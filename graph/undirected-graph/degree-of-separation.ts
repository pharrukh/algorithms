import { createReadStream } from "fs"
import { BreadthFirstPath } from "./breadth-first-path"
import { SymbolGraph } from "./symbol-graph"
import { createInterface } from "readline"
;(async () => {
  const args = process.argv.slice(2)
  const [path, separator, source, years] = args

  const currentYear = new Date().getFullYear()
  const isOlder =
    (currentYear: number, years: number) =>
    (movieYear: number): boolean => {
      return movieYear < currentYear - years
    }
  const isOlderThanInput = isOlder(currentYear, parseInt(years))

  const sg = await SymbolGraph.init(path, separator)
  if (!sg.contains(source)) console.log(`Graph does not contain ${source}`)

  const bfp = new BreadthFirstPath(sg.G, sg.index(source))

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

    if (!bfp.hasPathTo(sg.index(input))) {
      console.log(`Graph does not have a path from ${source} to ${input}`)
      line = await iterator.next()
      continue
    }

    if (isOlderThanInput(getYear(input))) {
      console.log(`The movie ${input} is older than ${years}`)
      line = await iterator.next()
      continue
    }

    const path = bfp.pathTo(sg.index(input))
    for (let item of path) {
      console.log("  ", sg.name(item))
    }

    line = await iterator.next()
  }
})()

function getYear(movie: string): number {
  const n = movie.length
  return parseInt(movie.slice(n - 5, n - 1))
}
