import { writeFileSync } from "fs"
import { generateBerlinSbahnEuclidianGraph } from "../generate-berlin-sbahn-graph"

interface Node {
  id: string
  position: {
    x: number
    y: number
  }
  data: Record<string, string | number>
}

interface Edge {
  id: string
  source: string
  target: string
}

const nodes: Node[] = []
const edges: Edge[] = []
const eg = generateBerlinSbahnEuclidianGraph()

const set = new Set()
console.log(eg.points.length)

const scale = 1.5
for (let v = 0; v < eg.points.length; v++) {
  const { name, x, y } = eg.points[v]
  const node: Node = {
    id: v + "",
    position: {
      x: x * scale,
      y: y * scale,
    },
    data: { label: name },
  }
  nodes.push(node)

  for (let w of eg.G.adj(v)) {
    if (set.has(`e${w}-${v}`) || set.has(`e${v}-${w}`)) continue

    set.add(`e${w}-${v}`)

    const edge: Edge = {
      id: `e${v}-${w}`,
      source: v + "",
      target: w + "",
    }
    edges.push(edge)
  }
}

writeFileSync("nodes.json", JSON.stringify(nodes))
writeFileSync("edges.json", JSON.stringify(edges))
