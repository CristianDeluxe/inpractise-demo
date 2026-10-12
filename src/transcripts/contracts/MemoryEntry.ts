import type { EditCategory } from './EditCategory'
import type { MemoryBasis } from './MemoryBasis'

/** One learned substitution: work/transcripts/memory/glossary.json is an array of these. */
export type MemoryEntry = {
  readonly from: string
  readonly to: string
  readonly category: EditCategory
  readonly occurrences: number
  readonly sources: readonly string[]
  readonly lastSeenAt: string
  readonly basis: MemoryBasis
}
