import { shuffle } from "../sorting/fisher-yates-shuffle"
import { Bag, BagNode } from "./bag"

export class RandomBag<T> extends Bag<T> {
  // Time Complexity - O(n)
  // Space Complexity - O(n)
  [Symbol.iterator]() {
    function* iterator(first: BagNode<T>): Iterator<T> {
      const items = []

      let node = first
      while (node) {
        items.push(node)
        node = node.next
      }

      shuffle(items)

      for (let item of items) {
        yield item.item
      }
    }

    return iterator(this.first)
  }
}

// const b = new RandomBag()
// for (let i = 0; i < 10; i++) {
//   b.add(i)
// }
// for (let item of b) {
//   console.log(item)
// }
