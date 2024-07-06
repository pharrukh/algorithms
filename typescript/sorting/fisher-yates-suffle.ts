export function fisherYatesSuffle<T>(A: T[]): void {
  let i = A.length
  while (--i > 0) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[A[i], A[j]] = [A[j], A[i]]
  }
}

export function shuffle<T>(A: T[]): void {
  fisherYatesSuffle(A)
}

// let i = 0
// const n = 10
// const arr1 = Array.from({ length: n }, () => i++)
// console.log(arr1)
// fisherYatesSuffle(arr1)
// console.log(arr1)
