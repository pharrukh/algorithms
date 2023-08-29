export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val === undefined ? 0 : val)
      this.left = (left === undefined ? null : left)
      this.right = (right === undefined ? null : right)
  }
}

export class Stack<T> {
  private arr: Array<T> = []

  isEmpty(): boolean {
      return this.arr.length === 0
  }

  peek(): T | null {
      return this.arr[this.arr.length - 1]
  }

  pop(): T | null {
      return this.arr.pop()
  }

  push(item: T): void {
      this.arr.push(item)
  }
}