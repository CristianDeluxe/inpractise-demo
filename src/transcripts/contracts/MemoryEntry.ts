import type { EditCategory } from './EditCategory'

/** One learned substitution: work/transcripts/memory/glossary.json is an array of these. */
export type MemoryEntry = {
  readonly from: string
  readonly to: string
  readonly category: EditCategory
  readonly occurrences: number
  readonly sources: readonly string[]
  readonly lastSeenAt: string
}
