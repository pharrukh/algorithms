import { TreeNode } from "./shared"

//          1
//      2      3
//    4   5      

export const GetSimpleTree = () => {
  const root = new TreeNode(1)
  root.left = new TreeNode(2)
  root.right = new TreeNode(3)

  root.left.left = new TreeNode(4)
  root.left.right = new TreeNode(5)

  return root
}
