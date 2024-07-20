// TODO: evaluate/revisit the name of this function
export function timeFunction<T, R>(
  fn: (...args: T[]) => R | void
): (...args: T[]) => { result: R; time: number } {
  return (...args: any): { result: R; time: number } => {
    const start = performance.now()
    const result = fn(...args) || undefined
    const end = performance.now()
    const time = end - start
    return { result, time }
  }
}

// TODO: evaluate/revisit the name of this function
export function humanReadableTime(milliseconds: number): string {
  milliseconds = Math.floor(milliseconds * 100) / 100
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
  const millis = milliseconds % 1000

  const parts: string[] = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`)
  if (seconds > 0 || minutes > 0 || hours > 0) parts.push(`${seconds}s`)
  parts.push(`${millis}ms`)

  return parts.join(" ")
}
