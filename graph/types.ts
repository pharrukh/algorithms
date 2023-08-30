export interface Paths {
  hasPathTo(v: number): boolean
  pathTo(v: number): Iterable<number>
}
