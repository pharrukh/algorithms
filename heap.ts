class Heap extends Array {
    heapSize: number;
    constructor(...args: number[]) {
        super(...args);
        this.heapSize = this.length;
    }

    toString(): string {
        let arrayString = super.toString();
        return `[${arrayString}](${this.heapSize}))`;
    }

    [Symbol.toPrimitive](hint: string) {
        if (hint == "string") {
            return this.toString();
        } else {
            return super[Symbol.toPrimitive](hint);
        }
    }
}

export function buildMaxHeap(A: Heap): void {
    for (let i = Math.floor(A.length / 2); i >= 0; i--) {
        maxHeapify(A, i);
    }
}

export function heapsort(A: Heap): void {
    buildMaxHeap(A);
    for (let i = A.length - 1; i > 0; i--) {
        swap(A, 0, i);
        A.heapSize--;
        maxHeapify(A, 0);
    }
}

export function maxHeapify(A: Heap, i: number): void {
    const l = left(i);
    const r = right(i);
    let largest = i;
    if (l < A.heapSize && A[l] > A[i]) {
        largest = l;
    }
    if (r < A.heapSize && A[r] > A[largest]) {
        largest = r;
    }
    if (largest !== i) {
        swap(A, i, largest);
        maxHeapify(A, largest);
    }
}

export function maxHeapifyAsLoop(A: Heap, i: number): void {
    while (i < A.length) {
        const l = left(i);
        const r = right(i);
        let largest = i;
        if (l < A.length && A[l] > A[i]) {
            largest = l;
        }
        if (r < A.length && A[r] > A[largest]) {
            largest = r;
        }
        if (largest !== i) {
            swap(A, i, largest);
        }
    }
}

function left(i: number): number {
    return 2 * i + 1;
}

function right(i: number): number {
    return 2 * i + 2;
}

function parent(i: number): number {
    return Math.floor((i - 1) / 2);
}

export function maximum(A: Heap): number {
    return A[0];
}

export function extractMax(A: Heap): number {
    if (A.heapSize < 0) {
        throw new Error('heap underflow');
    }

    const max = A[0];
    A[0] = A[A.heapSize - 1];
    A.heapSize--;
    maxHeapify(A, 0);
    return max;
}

export function increaseKey(A: Heap, i: number, key: number): void {
    if (key < A[i]) {
        throw new Error('new key is smaller than current key');
    }
    A[i] = key;
    let j = i
    while (j > 0 && A[parent(j)] < A[j]) {
        swap(A, j, parent(j));
        j = parent(j);
    }
}

export function insert(A: Heap, key: number): void {
    A.heapSize++;
    A[A.heapSize - 1] = Number.NEGATIVE_INFINITY;
    increaseKey(A, A.heapSize - 1, key);
}

function swap(A: any[], i: number, j: number): void {
    const tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}



console.log('\n\nTESTING maxHeapify');
const A = new Heap(16, 4, 10, 14, 7, 9, 3, 2, 8, 1);
console.log(A);
maxHeapify(A, 1);
console.log(A);

console.log('\n\nTESTING buildMaxHeap');
const A1 = new Heap(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(A1);
buildMaxHeap(A1);
console.log(A1);

console.log('\n\nTESTING heapsort');
const A2 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
console.log(A2);
heapsort(A2);
console.log(A2);

console.log('\n\nTESTING maximum');
const A3 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
console.log(A3);
console.log(maximum(A3));

console.log('\n\nTESTING extractMax');
const A4 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
console.log(A4);
console.log(extractMax(A4));
console.log(A4);

console.log('\n\nTESTING increaseKey');
const A5 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
console.log(A5);
increaseKey(A5, 4, 20);
console.log(A5);

console.log('\n\nTESTING insert');
const A6 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
console.log(A6);
insert(A6, 20);
console.log(A6);