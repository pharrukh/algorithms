export interface Comparable<T> {
  compareTo(that: T): -1 | 0 | 1
}
