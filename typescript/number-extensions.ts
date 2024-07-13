import { Comparable } from "./sorting/types"

declare global {
  interface Number extends Comparable<number> {
    compareTo(other: number): -1 | 0 | 1
  }
}

Number.prototype.compareTo = function (other: number): -1 | 0 | 1 {
  if (this.valueOf() > other) return 1
  if (this.valueOf() < other) return -1
  return 0
}

export {}
