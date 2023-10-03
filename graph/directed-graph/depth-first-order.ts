import { Queue } from "../../queue/queue"
import { Stack } from "../../stack/stack"
import { Digraph } from "./digraph"

export class DepthFirstOrder {
  pre: Queue<number>
  post: Queue<number>
  reversePost: Stack<number>

  marked: boolean[]

  constructor(private G: Digraph) {
    this.marked = Array.from({ length: G.V() }, () => false)
    this.pre = new Queue<number>()
    this.post = new Queue<number>()
    this.reversePost = new Stack<number>()

    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.dfs(v)
    }
  }

  dfs(v: number): void {
    this.pre.enqueue(v)

    this.marked[v] = true
    for (const w of this.G.adj(v)) {
      if (!this.marked[w]) this.dfs(w)
    }

    this.post.enqueue(v)
    this.reversePost.push(v)
  }

  preOrder(): Iterable<number> {
    return this.pre
  }

  postOrder(): Iterable<number> {
    return this.pre
  }

  reversePostOrder(): Iterable<number> {
    return this.reversePost
  }
}
