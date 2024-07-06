interface Comparable {
    compare(b: Comparable): -1 | 0 | 1
}

class MaxHeap {
    size: number = 0
    arr: number[] = []

    private parent(i: number): number {
        return Math.floor((i - 1) / 2)
    }

    private left(i: number): number {
        return i * 2 + 1
    }

    private right(i: number): number {
        return i * 2 + 2
    }

    private swap(i: number, j: number): void {
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
    }

    private maxHeapify(i: number): void {
        let max = i

        const left = this.left(i)
        const right = this.right(i)
        const arr = this.arr

        if(left < this.size && arr[left] > arr[max])
            max = left
        if(right < this.size && arr[right] > arr[max])
            max = right

        if (max !== i) {
            this.swap(i, max)
            this.maxHeapify(max)
        }
    }

    buildHeap(arr: number[]): void {
        this.arr = arr
        this.size = arr.length

        for(let i = Math.floor((arr.length - 1) / 2); i >= 0; i--) {
            this.maxHeapify(i)
        }
    }

    heapSort(): number[] {
        for(let i = this.arr.length - 1; i > 0; i--) {
            this.swap(0, i)
            this.size -= 1
            this.maxHeapify(0)
        }
        return this.arr
    }

    maximum(): number {
        return this.arr[0]
    }

    extractMaximum(): number {
        if(this.size < 1)
            throw new Error("Heap underflow")
        
        const max = this.maximum()
        this.swap(0, this.size - 1)
        this.size--
        this.maxHeapify(0)

        return max
    }

    increaseKey(i: number, key: number): void {
        const arr = this.arr

        if(key < arr[i])
            throw new Error("new key is smaller than current key")
        arr[i] = key

        while(i > 0 && arr[this.parent(i)] < arr[i]) {
            this.swap(i, this.parent(i))
            i = this.parent(i)
        }
    }

    insert(key: number): void {
        this.size++
        const lastIndex = this.size - 1
        this.arr[lastIndex] = -Infinity
        this.increaseKey(lastIndex, key)
    }
}

const heap = new MaxHeap()
heap.buildHeap([1,2,3,4,5])
heap.insert(1)
heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)
console.log(heap.arr)
console.log(heap.extractMaximum())

class MinHeap {
    size: number = 0
    arr: number[] = []

    private parent(i: number): number {
        return Math.floor((i - 1) / 2)
    }

    private left(i: number): number {
        return i * 2 + 1
    }

    private right(i: number): number {
        return i * 2 + 2
    }

    private swap(i: number, j: number): void {
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
    }

    private minHeapify(i: number): void {
        let min = i

        const left = this.left(i)
        const right = this.right(i)
        const arr = this.arr

        if(left < this.size && arr[left] < arr[min])
            min = left
        if(right < this.size && arr[right] < arr[min])
            min = right

        if (min !== i) {
            this.swap(i, min)
            this.minHeapify(min)
        }
    }

    buildHeap(arr: number[]): void {
        this.arr = arr
        this.size = arr.length

        for(let i = Math.floor((arr.length - 1) / 2); i >= 0; i--) {
            this.minHeapify(i)
        }
    }

    heapSort(): number[] {
        for(let i = this.arr.length - 1; i > 0; i--) {
            this.swap(0, i)
            this.size -= 1
            this.minHeapify(0)
        }
        return this.arr
    }

    minimum(): number {
        return this.arr[0]
    }

    extractMinimum(): number {
        if(this.size < 1)
            throw new Error("peap underflow")
        
        const min = this.minimum()
        this.swap(0, this.size - 1)
        this.size--
        this.minHeapify(0)

        return min
    }

    private decreaseKey(i: number, key: number): void {
        const arr = this.arr

        if(key > arr[i])
            throw new Error("new key is bigger than current key")
        arr[i] = key

        while(i > 0 && arr[this.parent(i)] > arr[i]) {
            this.swap(i, this.parent(i))
            i = this.parent(i)
        }
    }

    insert(key: number): void {
        this.size++
        const lastIndex = this.size - 1
        this.arr[lastIndex] = Infinity
        this.decreaseKey(lastIndex, key)
    }
}

const heap2 = new MinHeap()
heap2.insert(5)
heap2.insert(1)
heap2.insert(4)
heap2.insert(3)
heap2.insert(2)
console.log(heap2.arr)


// console.log('\n\nTESTING maxHeapify');
// const A = new Heap(16, 4, 10, 14, 7, 9, 3, 2, 8, 1);
// console.log(A);
// maxHeapify(A, 1);
// console.log(A);

// console.log('\n\nTESTING buildMaxHeap');
// const A1 = new Heap(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// console.log(A1);
// buildMaxHeap(A1);
// console.log(A1);

// console.log('\n\nTESTING heapsort');
// const A2 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
// console.log(A2);
// heapsort(A2);
// console.log(A2);

// console.log('\n\nTESTING maximum');
// const A3 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
// console.log(A3);
// console.log(maximum(A3));

// console.log('\n\nTESTING extractMax');
// const A4 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
// console.log(A4);
// console.log(extractMax(A4));
// console.log(A4);

// console.log('\n\nTESTING increaseKey');
// const A5 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
// console.log(A5);
// increaseKey(A5, 4, 20);
// console.log(A5);

// console.log('\n\nTESTING insert');
// const A6 = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
// console.log(A6);
// insert(A6, 20);
// console.log(A6);