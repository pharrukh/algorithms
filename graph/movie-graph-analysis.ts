/// 4.1.24

import { Stack } from "../stack/stack"
import { Graph } from "./graph"
import { GraphProperties } from "./graph-properties"
import { SymbolGraph } from "./symbol-graph"
import { Edge } from "./types"

function getComponents(G: Graph): number[][] {
  const components: number[][] = []
  let count = 0

  const marked = Array.from({ length: G.V() }, () => false)

  function dfs(v: number): void {
    const s = new Stack<number>()
    s.push(v)
    marked[v] = true

    while (!s.isEmpty()) {
      const v = s.pop()

      if (!components[count]) components[count] = []
      components[count].push(v)

      for (let w of G.adj(v)) {
        if (marked[w]) continue
        marked[w] = true

        s.push(w)
      }
    }
  }

  for (let v = 0; v < G.V(); v++) {
    if (marked[v]) continue
    dfs(v)
    count++
  }

  return components
}

;(async () => {
  const sg = await SymbolGraph.init("movies.txt", "/")
  const g = sg.G
  const kevinBaconKey = "Bacon, Kevin"
  if (!sg.contains(kevinBaconKey))
    throw new Error("The symbol graph does not have the key.")

  const components = getComponents(g)
  let maxCompId
  let maxSize = -Infinity

  for (let i = 0; i < components.length; i++) {
    if (maxSize < components[i].length) {
      maxCompId = i
      maxSize = components[i].length
    }
  }

  console.log(
    `number of components`,
    components.length,
    maxCompId,
    components[maxCompId],
    maxSize
  )

  const edgeSet = new Set<Edge>()
  for (const v of components[maxCompId]) {
    for (const w of g.adj(v)) {
      const vKey = sg.name(v)
      const wKey = sg.name(w)
      if (edgeSet.has(`${vKey}-${wKey}`) || edgeSet.has(`${wKey}-${vKey}`))
        continue
      edgeSet.add(`${vKey}-${wKey}`)
    }
  }
  console.log(`set length ${edgeSet.size}`)

  const subSg = new SymbolGraph(edgeSet)
  console.log("symbol graph is built")
  const gProps = new GraphProperties(subSg.G)
  console.log("properties are calculated")
  console.log(`
  # of conn components: ${components.length}
  max component size: ${maxSize}
  # of components with size less than 10: ${
    components.map((c) => c.length).filter((l) => l < 10).length
  }
  `)
  console.log(gProps.toString())
  console.log(
    `Does the largest component have Kevin Bacon? ${
      subSg.contains(kevinBaconKey) ? "yes" : "no"
    }`
  )
})()
