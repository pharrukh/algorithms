class LinkedListNode<T> {
  val: T
  next: LinkedListNode<T> | null
  constructor(val: T) {
    this.val = val
  }
}

export class Queue<T> {
  head: LinkedListNode<T> | null = null
  tail: LinkedListNode<T> | null = null
  size = 0

  isEmpty() {
    return this.size === 0
  }

  enqueue(item: T) {
    const node = new LinkedListNode(item)
    if (this.isEmpty()) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = this.tail.next
    }
    this.size++
  }

  dequeue(): T {
    if (this.isEmpty()) return null
    const node = this.head
    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
    }
    this.size--
    return node.val
  }

  private *iterator() {
    while (!this.isEmpty()) yield this.dequeue()
  }

  [Symbol.iterator]() {
    return this.iterator()
  }
}
