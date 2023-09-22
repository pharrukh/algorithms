import { ConnectedComponents } from "../connected-compontnets"
import { EuclidianGraph, Point } from "../creative/euclidian-graph"

export function generateRandomEuclidianGraphs(
  n: number,
  V: number,
  d: number
): EuclidianGraph[] {
  const generatePoint = (): Point => ({
    name: null,
    x: Math.random(),
    y: Math.random(),
  })
  const generatePoints = (V: number) =>
    Array.from({ length: V }, () => generatePoint())

  const distance = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

  const generateGraph = (V: number, d: number): EuclidianGraph => {
    const g = new EuclidianGraph()

    const points = generatePoints(V)
    points.forEach((p) => g.addVertex(p))

    for (const p1 of points) {
      for (const p2 of points) {
        if (p1[0] === p2[0] && p1[1] === p2[1]) continue
        if (distance(p1, p2) <= d) g.addEdge(p1, p2)
      }
    }

    return g
  }

  return Array.from({ length: n }, () => generateGraph(V, d))
}

// const d = 0.5
// const V = 10
// const graphs = generateRandomEuclidianGraphs(10, V, d)
// for (let graph of graphs) {
//   const cc = new ConnectedComponents(graph.G)
//   console.log(
//     `For V=${V} and d=${d}, the graph is ${
//       cc.getCount() > 1 ? "disconnected" : "connected"
//     }`
//   )
// }
