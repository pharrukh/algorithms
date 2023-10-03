import { Queue } from "../../queue/queue"

const Offsets = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]

function applyFloodFill(
  board: number[][],
  x: number,
  y: number,
  newColor: number
): void {
  const yMax = board.length
  const xMax = board[0].length

  const oldColor = board[y][x]

  if (oldColor === newColor) return

  const isWithinBoards = (x: number, y: number): boolean =>
    x < xMax && y < yMax && x >= 0 && y >= 0

  const q = new Queue<[number, number]>()
  q.enqueue([x, y])

  while (!q.isEmpty()) {
    const [x0, y0] = q.dequeue()
    board[y0][x0] = newColor
    for (const [dx, dy] of Offsets) {
      const newX = x0 + dx
      const newY = y0 + dy

      if (
        !isWithinBoards(newX, newY) ||
        board[newY][newX] !== oldColor ||
        board[newY][newX] === newColor
      )
        continue

      q.enqueue([newX, newY])
    }
  }
}

const board1 = [
  [0, 0, 0, 0],
  [0, 0, 1, 2],
  [0, 3, 1, 2],
  [0, 4, 5, 6],
]

function print(board: number[][]): void {
  const str = board.reduce(
    (acc, row) => acc + "\n" + row.reduce((acc, c) => acc + " " + c, ""),
    ""
  )
  console.log(str)
}

console.log("before")
print(board1)
applyFloodFill(board1, 0, 0, 8)
console.log("after")
print(board1)

const board2 = [
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 9, 2, 0],
  [0, 3, 1, 9, 2, 0],
  [0, 4, 0, 0, 6, 0],
  [0, 4, 0, 0, 6, 0],
  [0, 4, 0, 9, 6, 0],
  [0, 4, 0, 9, 6, 0],
  [0, 0, 0, 1, 0, 0],
]


console.log("before")
print(board2)
applyFloodFill(board2, 0, 0, 8)
console.log("after")
print(board2)