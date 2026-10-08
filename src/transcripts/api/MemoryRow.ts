import type { MemoryEntry } from '../contracts/MemoryEntry'

export type MemoryRow = {
  readonly glossary: readonly MemoryEntry[]
  readonly example_count: number
}
