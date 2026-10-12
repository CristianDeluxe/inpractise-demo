import type { MemoryBasis } from '@/transcripts/contracts/MemoryBasis.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

/** The edits a learn run turns into glossary entries, those that make a paragraph an example, and who vouched for them. */
export type LearnSelection = {
  readonly glossary: readonly ReviewedEdit[]
  readonly examples: readonly ReviewedEdit[]
  readonly basis: MemoryBasis
}
