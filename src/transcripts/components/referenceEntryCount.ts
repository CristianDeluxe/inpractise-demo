import type { MemoryEntry } from '../contracts/MemoryEntry'

export function referenceEntryCount(entries: readonly MemoryEntry[]): number {
  return entries.filter((entry) => entry.basis === 'references').length
}
