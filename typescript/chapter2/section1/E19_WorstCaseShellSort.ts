import { shuffle } from "../../sorting/fisher-yates-shuffle"
import { exch } from "../../sorting/sorting"
import { writeFileSync } from "fs"
import { updateProgressBar } from "../../utils"

interface Result {
  max: number
  arrays: number[][]
}

function shellsort(A: number[]): number {
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
    h = (h - 1) / 3
  }

  return n
}

function worstCaseShellSort(): Result {
  const N = 100_000
  const A = Array.from({ length: 100 }, (_, i) => i + 1)

  let maxComp = -Infinity
  const arrays = []

  for (let i = 0; i < N; i++) {
    const shuffled = [...A]
    shuffle(shuffled)
    const original = [...shuffled]

    const compNum = shellsort(shuffled)
    if (maxComp < compNum) {
      maxComp = compNum
      arrays.length = 0
    }

    if (maxComp === compNum) arrays.push(original)

    // Update the progress bar
    updateProgressBar(i + 1, N, `Max: ${maxComp}`)
  }

  console.log() // Move to the next line after progress bar completes

  return {
    max: maxComp,
    arrays,
  }
}

writeFileSync("./e19-worst-case-shell-sort-result.json", JSON.stringify(worstCaseShellSort(), null, 2))
