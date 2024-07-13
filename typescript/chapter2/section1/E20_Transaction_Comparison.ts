import { Result, err, ok } from "../../basic-types"
import "../../date-extensions"

interface Comparable {
  compareTo(that: this): number
}

export class Transaction implements Comparable {
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

  public compareTo(that: Transaction): number {
    if (this.amount > that.amount) return +1
    if (this.amount < that.amount) return -1
    return 0
  }
}
