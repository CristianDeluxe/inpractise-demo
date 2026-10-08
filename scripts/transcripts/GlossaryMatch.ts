import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'

export type GlossaryMatch = {
  readonly start: number
  readonly end: number
  readonly entry: MemoryEntry
}
