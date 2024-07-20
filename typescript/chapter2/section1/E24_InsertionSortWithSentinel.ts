import "../../number-extensions"
import { less, exch, getSentinel } from "../../sorting/sorting"
import { Comparable } from "../../sorting/types"
import { humanReadableTime, timeFunction } from "../../benchmarking"
import { updateProgressBar } from "../../utils"

function insertionSortDefault<T extends Comparable<T>>(A: T[]): void {
  const N = A.length
  for (let i = 1; i < N; i++) {
    for (let j = i; j > 0 && less(A, j, j - 1); j--) {
      exch(A, j, j - 1)
    }
  }
}

function insertionSortWithSentinel<T extends Comparable<T>>(A: T[]): void {
  const N = A.length
  A.push(getSentinel(typeof A[0]))
  exch(A, 0, A.length - 1)
  for (let i = 1; i < N; i++) {
    for (let j = i; less(A, j, j - 1); j--) {
      exch(A, j, j - 1)
    }
  }
}

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100000))
}

function sortCompare<T extends Comparable<T>>(
  algorithms: { [key: string]: (arr: number[]) => void },
  size: number,
  trials: number
): void {
  const results: { [key: string]: number[] } = {}

  for (let alg in algorithms) {
    results[alg] = []
  }

  const cloningTimes: number[] = []

  for (let t = 0; t < trials; t++) {
    const arr = generateRandomArray(size)
    for (let alg in algorithms) {
      const timeAndClone = timeFunction((A: number[]) => [...A])
      const { result: A, time: cloningTime } = timeAndClone(arr)
      cloningTimes.push(cloningTime)

      const timeAndSort = timeFunction(algorithms[alg])
      const { time } = timeAndSort(A)
      results[alg].push(time)
    }
    updateProgressBar(t, trials)
  }

  console.log("\n")

  for (let alg in algorithms) {
    const total = results[alg].reduce((acc, curr) => acc + curr, 0)
    const avg = total / trials
    console.log(`Algorithm: ${alg}, Average Time: ${humanReadableTime(avg)} over ${trials} trials`)
  }

  const total = cloningTimes.reduce((acc, curr) => acc + curr, 0)
  const avg = total / trials
  console.log(
    `Average Cloning Time for length ${size}: ${humanReadableTime(avg)} over ${trials} trials`
  )
}

// Usage example:
const algorithms = {
  "Insertion Sort Default": insertionSortDefault,
  "Insertion Sort with Sentinel": insertionSortWithSentinel,
}

const arraySize = 1_000_000
const trials = 1

// Algorithm: Insertion Sort Default, Average Time: 225.73ms over 100 trials
// Algorithm: Insertion Sort with Sentinel, Average Time: 226.29ms over 100 trials
// Average Cloning Time for length 10000: 0.08ms over 100 trials
sortCompare(algorithms, arraySize, trials)
