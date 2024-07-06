// returns r that belongs to [0, n)
export function getRandomInt(n: number): number {
  const r = Math.random()
  return Math.floor(r * n)
}

export function getRandomVertex(V: number): number {
  const r = Math.random()
  return Math.floor(r * V)
}