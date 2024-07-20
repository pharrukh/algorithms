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

function insertionSortWithRightMove<T extends Comparable<T>>(A: T[]): void {
  const moveRight = (A: T[], i: number): void => {
    ;[A[i], A[i + 1]] = [A[i + 1], A[i]]
  }
  const more = (A: T[], i: number, j: number): boolean => A[i].compareTo(A[j]) < 0

  const N = A.length
  for (let i = N - 2; i >= 0; i--) {
    for (let j = i + 1; j < N && more(A, j - 1, j); j++) {
      moveRight(A, j - 1)
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

const algorithms = {
  "Insertion Sort Default": insertionSortDefault,
  "Insertion Sort with RightMove": insertionSortWithRightMove,
}

const arraySize = 10_000
const trials = 100

// Algorithm: Insertion Sort Default, Average Time: 212.14ms over 100 trials
// Algorithm: Insertion Sort with RightMove, Average Time: 206.77ms over 100 trials
// Average Cloning Time for length 10000: 0.13ms over 100 trials
sortCompare(algorithms, arraySize, trials)
