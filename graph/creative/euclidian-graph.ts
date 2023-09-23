import { Graph } from "../graph"

export type Point = {
  name: string
  x: number
  y: number
}
export type PointHash = `${number}-${number}`

export class EuclidianGraph {
  pointMap: Map<PointHash, number> = new Map()
  points: Point[] = []
  G: Graph

  constructor() {
    this.G = new Graph()
  }

  contains(point: Point): boolean {
    return this.pointMap.has(this.#getHash(point))
  }

  point(v: number): Point {
    return this.points[v]
  }

  index(point: Point): number {
    return this.pointMap.get(this.#getHash(point))
  }

  #getHash({ x, y }: Point): PointHash {
    return `${x}-${y}`
  }

  addVertex(point: Point): void {
    const v = this.G.V()
    this.pointMap.set(this.#getHash(point), v)
    this.points[v] = point

    this.G.addVertex(v)
  }

  addEdge(p1: Point, p2: Point): void {
    const missingPoints = [p1, p2].filter((p) => !this.contains(p))
    if (missingPoints.length > 0)
      throw new Error(`Missing ${missingPoints} in the graph`)

    const v = this.pointMap.get(this.#getHash(p1))
    const w = this.pointMap.get(this.#getHash(p2))

    this.G.addEdge(v, w)
  }
}
