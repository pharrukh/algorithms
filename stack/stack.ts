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

  *iterator(): Iterator<T> {
    while(this.arr.length) yield this.arr.pop()
  }

  [Symbol.iterator]() {
    return this.iterator()
  }
}