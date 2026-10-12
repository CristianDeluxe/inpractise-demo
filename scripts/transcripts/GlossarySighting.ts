import type { MemoryBasis } from '@/transcripts/contracts/MemoryBasis.ts'

/** Where and when a substitution was seen, and who vouched for it. */
export type GlossarySighting = {
  readonly transcriptId: string
  readonly seenAt: string
  readonly basis: MemoryBasis
}
