export type Result<T, E> = Ok<T> | Err<E>

export class Ok<T> {
  constructor(public value: T) {}

  isOk(): this is Ok<T> {
    return true
  }

  isErr(): this is Err<never> {
    return false
  }
}

export class Err<E> {
  constructor(public error: E) {}

  isOk(): this is Ok<never> {
    return false
  }

  isErr(): this is Err<E> {
    return true
  }
}

export const ok = <T>(value: T): Result<T, never> => new Ok(value)
export const err = <E>(error: E): Result<never, E> => new Err(error)
