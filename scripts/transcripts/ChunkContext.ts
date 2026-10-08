import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import type { TranscriptSource } from '@/transcripts/contracts/TranscriptSource.ts'

export type ChunkContext = {
  readonly source: TranscriptSource
  readonly glossary: readonly MemoryEntry[]
  readonly examples: readonly MemoryExample[]
}
