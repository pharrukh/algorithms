import assert from "assert"
import { exch, isSorted } from "../../sorting/sorting"

function shellsort(A: number[]): void {
  const N = A.length
  let n = 0
  const less = (i: number, j: number): boolean => {
    n++
    return A[i] < A[j]
  }

  let h = 1
  while (h < N / 3) h = h * 3 + 1
  while (h >= 1) {
    for (let i = h; i < N; i++) {
      for (let j = i; j >= h && less(j, j - h); j -= h) {
        exch(A, j, j - h)
      }
    }
    console.log(`h:${h} | ${Math.round(n*100 / N)/100}`)
    n = 0
    h = (h - 1) / 3
  }
}

function generateRandomDoubleCollection(n: number): number[] {
  return Array.from({ length: n }, () => Math.random())
}

function test(): void {
  const sizes = [100, 100000, 1000000, 10000000]
  for(const size of sizes) {
    console.log(`Testing n:${size}`)
    const randomDoubles = generateRandomDoubleCollection(size)
    shellsort(randomDoubles)
    assert(isSorted(randomDoubles), `Collection was not sorted, ${randomDoubles}`)
  }
}

test()