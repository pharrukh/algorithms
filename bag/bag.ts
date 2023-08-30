class BagNode<T> {
  constructor(public item: T, public next: BagNode<T> | null) {}
}

export class Bag<T> {
  private first: BagNode<T>

  add(item: T): void {
    const oldFirst = this.first
    this.first = new BagNode(item, oldFirst)
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

// for(let n of bag) {
//   console.log(n)
// }
