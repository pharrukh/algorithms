export function exch<T>(A: T[], i: number, j: number): void {
  ;[A[i], A[j]] = [A[j], A[i]]
}

export function less<T>(A: T[], i: number, j: number): boolean {
  if(typeof A[0] === 'number') return A[i] < A[j]
  throw new Error('NotImplementedException')
}

export function isSorted<T>(A: T[]): boolean {
  for(let i = 0; i < A.length - 1; i++) {
    if(A[i] > A[i+1]) return false
  }
  return true
}