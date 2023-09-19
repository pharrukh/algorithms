export class Stack<T> {
  arr = []

  isEmpty(): boolean {
    return this.arr.length === 0
  }

  push(item: T): void {
    this.arr.push(item)
  }

  pop(): T {
    return this.arr.pop()
  }

  peek(): T {
    return this.arr[this.arr.length - 1]
  }

  *iterator(): Iterator<T> {
    while (this.arr.length) yield this.arr.pop()
  }

  [Symbol.iterator]() {
    return this.iterator()
  }
}
