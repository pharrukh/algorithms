// chapter2/section1/Exercise12.ts

class ComparesByIncrement {
  increment: number
  comparesByArraySize: number

  constructor(increment: number, comparesByArraySize: number) {
    this.increment = increment
    this.comparesByArraySize = comparesByArraySize
  }
}

function main() {
  const maxArraySize = 10000000

  for (let i = 100; i <= maxArraySize; i *= 10) {
    const array: number[] = new Array(i)

    for (let j = 0; j < array.length; j++) {
      array[j] = Math.random()
    }

    const comparesByIncrements = shellsort(array)
    printStatistics(comparesByIncrements)
  }
}

function shellsort(array: number[]): ComparesByIncrement[] {
  const comparesByIncrements: ComparesByIncrement[] = []
  let numberOfCompares: number

  let incrementSequence = 1

  while (incrementSequence * 3 + 1 < array.length) {
    incrementSequence *= 3
    incrementSequence++
  }

  while (incrementSequence > 0) {
    numberOfCompares = 0

    for (let i = incrementSequence; i < array.length; i++) {
      numberOfCompares++

      for (
        let j = i;
        j >= incrementSequence && array[j] < array[j - incrementSequence];
        j -= incrementSequence
      ) {
        const temp = array[j]
        array[j] = array[j - incrementSequence]
        array[j - incrementSequence] = temp

        numberOfCompares++
      }
    }

    const comparesByArraySize = numberOfCompares / array.length
    const comparesByIncrement = new ComparesByIncrement(incrementSequence, comparesByArraySize)
    comparesByIncrements.push(comparesByIncrement)

    incrementSequence = Math.floor(incrementSequence / 3)
  }

  return comparesByIncrements
}

function printStatistics(comparesByIncrements: ComparesByIncrement[]) {
  console.log("Increment | Compares by Array Size")

  for (const comparesByIncrement of comparesByIncrements) {
    console.log(
      `${comparesByIncrement.increment
        .toString()
        .padStart(11)} ${comparesByIncrement.comparesByArraySize.toFixed(2).padStart(16)}`
    )
  }
}

// Run the main function
main()
