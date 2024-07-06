import { GetSimpleTree } from "./data";
import { Stack, TreeNode } from "./shared";

function inOrderIterative(node: TreeNode): void {
  const s = new Stack<TreeNode>()
  while(!s.isEmpty() || node) {
    if(node) {
      s.push(node)
      node = node.left
    } else {
      node = s.pop()
      visit(node)
      node = node.right
    }
  }
}

function visit(node: TreeNode): void {
  console.log(node.val)
}

const root = GetSimpleTree()
inOrderIterative(root)