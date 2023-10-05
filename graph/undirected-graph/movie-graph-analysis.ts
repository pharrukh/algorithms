/// 4.1.24

import { ConnectedComponents } from "./connected-compontnets"
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
      if (edgeSet.has(`${vKey}__${wKey}`) || edgeSet.has(`${wKey}__${vKey}`))
        continue
      edgeSet.add(`${vKey}__${wKey}`)
    }
  }
  console.log(`set length ${edgeSet.size}`)

  const gProps = new GraphProperties(g)

  console.log(`
  # of conn components: ${components.length}
  max component size: ${maxSize}
  # of components with size less than 10: ${
    components.map((c) => c.length).filter((l) => l < 10).length
  }
  `)
  console.log(gProps.toString())
})()
