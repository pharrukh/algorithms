import { exch, less } from "./sorting"
import { Comparable } from "./types"

export function shellsort<T extends Comparable<T>>(A: T[]): void {
  const N = A.length
  let h = 1
  while (h < N / 3) h = h * 3 + 1
  while (h >= 1) {
    for (let i = h; i < N; i++) {
      for (let j = i; j >= h && less(A, j, j - h); j -= h) {
        exch(A, j, j - h)
      }
    }
    h = (h - 1) / 3
  }
}
