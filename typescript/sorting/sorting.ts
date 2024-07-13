import { Comparable } from "./types"

export function exch<T>(A: T[], i: number, j: number): void {
  ;[A[i], A[j]] = [A[j], A[i]]
}

export function less<T extends Comparable<T>>(A: T[], i: number, j: number): boolean {
  return A[i].compareTo(A[j]) < 0
}

export function isSorted<T extends Comparable<T>>(A: T[]): boolean {
  for (let i = 0; i < A.length - 1; i++) {
    if (less(A, i + 1, i)) return false
  }
  return true
}
