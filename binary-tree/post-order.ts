import { GetSimpleTree } from "./data";
import { Stack, TreeNode } from "./shared";

function postOrderIterative(node: TreeNode): void {
  const s = new Stack<TreeNode>()
  let lastVisitedNode
  while(!s.isEmpty() || node) {
    if(node) {
      s.push(node)
      node = node.left
    } else {
      const peekNode = s.peek()
      if(peekNode.right && peekNode.right !== lastVisitedNode) node = peekNode.right
      else {
        visit(peekNode)
        lastVisitedNode = s.pop()
      }
    }
  }
}

function visit(node: TreeNode): void {
  console.log(node.val)
}

postOrderIterative(GetSimpleTree())