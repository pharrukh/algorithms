/// 4.1.24

import { Stack } from "../stack/stack"
import { ConnectedComponents } from "./connected-compontnets"
import { Graph } from "./graph"
import { GraphProperties } from "./graph-properties"
import { SymbolGraph } from "./symbol-graph"
import { Edge } from "./types"
;(async () => {
  const sg = await SymbolGraph.init("movies.txt", "/")
  const g = sg.G
  const kevinBaconKey = "Bacon, Kevin"
  if (!sg.contains(kevinBaconKey))
    throw new Error("The symbol graph does not have the key.")

  const cc = new ConnectedComponents(g)
  const components = cc.components
  let maxCompId
  let maxSize = -Infinity

  for (let i = 0; i < components.length; i++) {
    if (maxSize < components[i].length) {
      maxCompId = i
      maxSize = components[i].length
    }
  }

  console.log(`number of components`, cc.getCount())

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

  const subSg = new SymbolGraph(edgeSet)n
  console.log(`symbol graph is built: ${subSg.G.V()} ${subSg.G.E()}`)
  console.log(subSg.name(297 + 1))
  // const gProps = new GraphProperties(subSg.G)

  console.log(`
  # of conn components: ${components.length}
  max component size: ${maxSize}
  # of components with size less than 10: ${
    components.map((c) => c.length).filter((l) => l < 10).length
  }
  `)
  // console.log(gProps.toString())
  console.log(
    `Does the largest component have Kevin Bacon? ${
      subSg.contains(kevinBaconKey) ? "yes" : "no"
    }`
  )
})()
