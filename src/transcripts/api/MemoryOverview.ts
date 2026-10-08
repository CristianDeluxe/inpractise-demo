import type { MemoryEntry } from '../contracts/MemoryEntry'

export type MemoryOverview = {
  readonly glossary: readonly MemoryEntry[]
  readonly examples: number
}
