import { shellsort } from "../../sorting/shellsort"
import { Transaction } from "./E20_TransactionComparison"

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomTransaction(): Transaction | null {
  const names = ["Alice", "Bob", "Charlie", "David", "Eve"]
  const who = names[getRandomInt(0, names.length)]
  const date = getRandomDate(new Date(2020, 0, 1), new Date(2025, 0, 1))
  const amount = getRandomInt(1, 10000)

  const result = Transaction.create(who, date, amount)
  if (result.isOk()) {
    return result.value
  } else {
    console.error(result.error)
    return null
  }
}

const transactions: Transaction[] = []
for (let i = 0; i < 1000; i++) {
  const transaction = getRandomTransaction()
  if (transaction !== null) {
    transactions.push(transaction)
  }
}

shellsort(transactions)

console.log("\nTop 10 Transactions:")
for (let i = 0; i < 10; i++) {
  console.log(transactions[i].toString())
}

console.log("\nLast 10 Transactions:")
for (let i = transactions.length - 10; i < transactions.length; i++) {
  console.log(transactions[i].toString())
}
