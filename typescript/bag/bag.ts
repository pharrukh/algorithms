export class BagNode<T> {
  constructor(public item: T, public next: BagNode<T> | null) {}
}

export class Bag<T> {
  public size: number = 0
  protected first: BagNode<T>

  getAny(): T {
    if (this.first) return this.first.item
    return null
  }

  add(item: T): void {
    this.size++
    const oldFirst = this.first
    this.first = new BagNode(item, oldFirst)
  }

  has(item: T): boolean {
    for (const cur of this) {
      if (cur === item) return true
    }
    return false
  }

  remove(item: T): void {
    if (!this.first) throw new Error("Nothing to remove!")

    if (this.first.item === item) {
      this.first = this.first.next
      this.size--
      return
    }

    let prev = this.first
    let cur = prev.next

    while (cur && cur.item !== item) {
      prev = cur
      cur = cur.next
    }

    if (!cur) throw new Error(`${item} is not in the bag`)

    prev.next = cur.next
    this.size--
  }

  private *iterator(): Iterator<T> {
    let node = this.first
    while (node) {
      yield node.item
      node = node.next
    }
  }

  [Symbol.iterator]() {
    return this.iterator()
  }

  toString(): string {
    let str = ""

    for (let item of this) {
      str += `${item} => `
    }

    return str.substring(0, str.length - 4)
  }
}

// const bag = new Bag<number>()
// bag.add(1)
// bag.add(2)
// bag.add(3)

// for (let n of bag) {
//   console.log(n)
// }

// bag.remove(2)
// bag.remove(3)
// bag.remove(1)
// for (let n of bag) {
//   console.log(n)
// }
