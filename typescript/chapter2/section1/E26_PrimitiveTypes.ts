import { performance } from "perf_hooks"
import { updateProgressBar } from "../../utils"

const lessPrimitive = (a: number, b: number): boolean => a < b

const lessNumberObject = (a: Number, b: Number): boolean => a.valueOf() < b.valueOf()

const swap = <T>(arr: T[], i: number, j: number): void => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const sortPrimitive = (arr: number[]): void => {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0 && lessPrimitive(arr[j], arr[j - 1]); j--) {
      swap(arr, j, j - 1)
    }
  }
}

const sortNumberObject = (arr: Number[]): void => {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0 && lessNumberObject(arr[j], arr[j - 1]); j--) {
      swap(arr, j, j - 1)
    }
  }
}

const measureTimePrimitive = (array: number[]): number => {
  const startTime = performance.now()
  sortPrimitive(array)
  const endTime = performance.now()
  return (endTime - startTime) / 1000
}

const measureTimeNumberObject = (array: Number[]): number => {
  const startTime = performance.now()
  sortNumberObject(array)
  const endTime = performance.now()
  return (endTime - startTime) / 1000
}

const measureAverageTime = (
  size: number,
  trials: number
): { primitive: number; numberObject: number } => {
  const totalTimePrimitive = Array.from({ length: trials }).reduce((acc: number, _, t) => {
    const primitiveArray: number[] = Array.from({ length: size }, () =>
      Math.floor(Math.random() * size)
    )
    const time = measureTimePrimitive(primitiveArray)
    updateProgressBar(t + 1, trials, `Trial ${t + 1}/${trials}`)
    return acc + time
  }, 0) as number

  const totalTimeNumberObject = Array.from({ length: trials }).reduce((acc: number, _, t) => {
    const numberObjectArray: Number[] = Array.from(
      { length: size },
      () => new Number(Math.floor(Math.random() * size))
    )
    const time = measureTimeNumberObject(numberObjectArray)
    updateProgressBar(t + 1, trials, `Trial ${t + 1}/${trials}`)
    return acc + time
  }, 0) as number

  return {
    primitive: totalTimePrimitive / trials,
    numberObject: totalTimeNumberObject / trials,
  }
}

const main = (): void => {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.log("Usage: ts-node SortCompare <array size> <number of trials>")
    return
  }

  const size = parseInt(args[0])
  const trials = parseInt(args[1])

  const { primitive, numberObject } = measureAverageTime(size, trials)

  if (primitive < 1e-6 || numberObject < 1e-6) {
    console.log(
      "The elapsed time for one or both algorithms is too small to make a reliable comparison."
    )
  } else {
    const ratio = numberObject / primitive
    if (ratio > 1) {
      console.log(
        `For ${size} random numbers\n   sortPrimitive is ${ratio.toFixed(
          1
        )} times faster than sortNumberObject`
      )
    } else {
      console.log(
        `For ${size} random numbers\n   sortPrimitive is ${(1 / ratio).toFixed(
          1
        )} times slower than sortNumberObject`
      )
    }
  }
}

main()
