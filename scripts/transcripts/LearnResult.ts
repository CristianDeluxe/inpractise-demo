import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'

export type LearnResult = {
  readonly counted: number
  readonly glossaryEntries: number
  readonly newEntries: number
  readonly updatedEntries: number
  readonly newExamples: number
  readonly learned: readonly MemoryEntry[]
}
