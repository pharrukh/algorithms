import { Result, err, ok } from "../../basic-types"
import "../../date-extensions"
import { Comparable } from "../../sorting/types"

export class Transaction implements Comparable<Transaction> {
  private constructor(public who: string, public date: Date, public amount: number) {}

  public static create(who: string, date: Date, amount: number): Result<Transaction, string> {
    const transaction = new Transaction(who, date, amount)
    const validation = transaction.isValid()
    if (validation.isErr()) {
      return err(validation.error)
    }
    return ok(transaction)
  }

  private isValid(): Result<true, string> {
    if (!this.who) {
      return err("The initiator of the transaction 'who' must not be empty.")
    }
    if (!this.date) {
      return err("The date of the transaction must not be empty.")
    }
    if (this.amount === undefined || this.amount === null) {
      return err("The amount of the transaction must not be empty.")
    }
    if (!this.date.isNotInPast()) {
      return err("The date of the transaction must not be in the past.")
    }
    return ok(true)
  }

  public compareTo(that: Transaction): 1 | 0 | -1 {
    if (this.amount > that.amount) return +1
    if (this.amount < that.amount) return -1
    return 0
  }

  public toString(): string {
    return `<${this.who}, ${this.date.toISOString()}, ${this.amount}>`
  }
}
