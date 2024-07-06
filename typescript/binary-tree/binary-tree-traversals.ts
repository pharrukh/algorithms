import { Stack } from "../stack/stack"

class DoubleLinkedListNode<T> {
  next: DoubleLinkedListNode<T> | null
  prev: DoubleLinkedListNode<T> | null
  constructor(public val: T) {}
}

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val: number) {
    this.val = val
  }
}

class Queue<T> {
  public size = 0
  private head: DoubleLinkedListNode<T> | null
  private tail: DoubleLinkedListNode<T> | null

  isEmpty(): boolean {
    return this.size === 0
  }

  enqueue(item: T): void {
    const newNode = new DoubleLinkedListNode(item)
    if (this.size === 0) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
    this.size++
  }

  dequeue(): T {
    const node = this.tail

    if (this.size === 1) {
      this.head = null
    }

    this.tail = this.tail.prev
    this.size--

    return node.val
  }
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
root.left.left.left = new TreeNode(8)
root.left.left.right = new TreeNode(9)

let result = []
const visit = ({ val }: TreeNode) => result.push(val)
const cleanUp = () => (result = [])

function levelOrder(root: TreeNode, visit: (item: TreeNode) => void): void {
  const queue = new Queue<TreeNode>()
  queue.enqueue(root)

  while (queue.size > 0) {
    const node = queue.dequeue()
    visit(node)

    if (node.left) {
      queue.enqueue(node.left)
    }

    if (node.right) {
      queue.enqueue(node.right)
    }
  }
}

console.log("levelOrder | BFS")
levelOrder(root, visit)
console.log(result)
cleanUp()

console.log(`\n\nPRE-ORDER`)

function preOrderIterative(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  const stack = new Stack<TreeNode>()
  stack.push(root)

  while (!stack.isEmpty()) {
    const node = stack.pop()
    visit(node)

    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
}

console.log("preOrderIterative")
preOrderIterative(root, visit)
console.log(result)
cleanUp()

function preOrderRecursive(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  if (!root) return

  visit(root)
  preOrderRecursive(root.left, visit)
  preOrderRecursive(root.right, visit)
}

console.log("preOrderRecursive")
preOrderRecursive(root, visit)
console.log(result)
cleanUp()

function inOrderRecursive(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  if (!root) return

  inOrderRecursive(root.left, visit)
  visit(root)
  inOrderRecursive(root.right, visit)
}

console.log(`\n\nIN-ORDER`)

console.log("inOrderRecursive")
inOrderRecursive(root, visit)
console.log(result)
cleanUp()

function inOrderIterative(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  let node = root
  const stack = new Stack<TreeNode>()
  while (!stack.isEmpty() || node) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      visit(node)
      node = node.right
    }
  }
}

console.log("inOrderIterative")
inOrderIterative(root, visit)
console.log(result)
cleanUp()

console.log(`\n\nPOST-ORDER`)

function postOrderRecursive(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  if (!root) return

  postOrderRecursive(root.left, visit)
  postOrderRecursive(root.right, visit)
  visit(root)
}

console.log("postOrderRecursive")
postOrderRecursive(root, visit)
console.log(result)
cleanUp()

function postOrderIterative(
  root: TreeNode,
  visit: (node: TreeNode) => void
): void {
  let node = root
  const stack = new Stack<TreeNode>()
  let lastVisitedNode = null
  while (!stack.isEmpty() || node) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      const peekNode = stack.peek()
      if (peekNode.right && lastVisitedNode !== peekNode.right) {
        node = peekNode.right
      } else {
        visit(peekNode)
        lastVisitedNode = stack.pop()
      }
    }
  }
}

console.log("postOrderIterative")
postOrderIterative(root, visit)
console.log(result)
cleanUp()
