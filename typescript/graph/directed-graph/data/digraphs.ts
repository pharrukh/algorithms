import { Digraph } from "../digraph"

// to easier refer to examples in my head I decided to call fixtures by names
// the most beautiful / exemplar I call after my friend, others - just random Uzbek names

export const getIslomDAG = (): Digraph => {
  const g = new Digraph(6)

  g.addEdge(0, 2)
  g.addEdge(1, 0)
  g.addEdge(1, 3)
  g.addEdge(2, 4)
  g.addEdge(2, 5)
  g.addEdge(3, 2)

  return g
}

export const getIlhomDAG = (): Digraph => {
  const g = new Digraph(5)

  g.addEdge(0, 2)
  g.addEdge(0, 1)
  g.addEdge(1, 3)
  g.addEdge(2, 3)
  g.addEdge(1, 4)

  return g
}

// see p. 583
export const getTimurDAG = (): Digraph => {
  const g = new Digraph(13)

  g.addEdge(0, 1)
  g.addEdge(0, 5)
  g.addEdge(0, 6)
  g.addEdge(2, 0)
  g.addEdge(2, 3)
  g.addEdge(3, 5)
  g.addEdge(5, 4)
  g.addEdge(6, 4)
  g.addEdge(6, 9)
  g.addEdge(7, 6)
  g.addEdge(8, 7)
  g.addEdge(9, 10)
  g.addEdge(9, 11)
  g.addEdge(9, 12)
  g.addEdge(11, 12)

  return g
}

// see p. 584
export const getSafiaDiraph = (): Digraph => {
  const g = new Digraph(13)

  g.addEdge(0, 1)
  g.addEdge(0, 5)

  g.addEdge(2, 0)
  g.addEdge(2, 3)
  
  g.addEdge(3, 2)
  g.addEdge(3, 5)
  
  g.addEdge(4, 2)
  g.addEdge(4, 3)
  
  g.addEdge(5, 4)
  
  g.addEdge(6, 0)
  g.addEdge(6, 4)
  g.addEdge(6, 8)
  g.addEdge(6, 9)
  
  g.addEdge(7, 6)
  g.addEdge(7, 9)
  
  g.addEdge(8, 6)
  
  g.addEdge(9, 10)
  g.addEdge(9, 11)
  
  g.addEdge(10, 12)
  
  g.addEdge(11, 12)
  
  g.addEdge(12, 9)

  return g
}
