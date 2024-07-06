class Heap extends Array<number> {
  heapSize: number
  constructor(arr: number[]){
    super(...arr)
    this.heapSize = arr.length
  }
  isEmpty(): boolean {
    return this.heapSize === 0
  }
}

function left(i: number): number {
  return i*2 + 1
}

function right(i: number): number {
  return i*2 + 2
}

function swap(A: Heap, i: number, j: number): void {
  [A[i], A[j]] = [A[j], A[i]]
}

function maxHeapify(A: Heap, i: number): void {
  let max = i
  const l = left(i)
  const r = right(i)

  if(l < A.heapSize && A[l] > A[max]) max = l
  if(r < A.heapSize && A[r] > A[max]) max = r

  if(i !== max) {
    swap(A, i, max)
    maxHeapify(A, max)
  }
}

function build(arr: number[]): Heap {
  const A = new Heap(arr)

  for(let i =  Math.floor(A.heapSize/2); i >= 0; i--) {
    maxHeapify(A, i)
  }

  return A
}

const arr = [1,2,3,4,5,6,7,8,9,10]
let A = build(arr)
console.log(A, A.heapSize)

function extractMax(A: Heap): number {
  swap(A, 0, A.heapSize-1)
  A.heapSize--
  maxHeapify(A, 0)
  return A[A.heapSize]
}


while(A.heapSize > 0) {
  console.log(extractMax(A))
  console.log(A)
}

function insert(A: Heap, key: number): void {
  A[A.heapSize] = key
  swap(A, 0, A.heapSize)
  A.heapSize++
  maxHeapify(A, 0)
}

const arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
let B = new Heap([])
for(const n of arr2) {
  insert(B, n)
  console.log(B, B.heapSize)
}

function heapSort(arr: number[]) {
  const answer = []
  const heap = build(arr)
  while(!heap.isEmpty()) {
    answer.push(extractMax(heap))
  }
  return answer
}

console.log(heapSort(arr2))