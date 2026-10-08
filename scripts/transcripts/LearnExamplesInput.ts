import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import type { ReviewableRun } from './ReviewableRun.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

export type LearnExamplesInput = {
  readonly transcriptId: string
  readonly run: ReviewableRun
  readonly rawByParagraph: ReadonlyMap<string, string>
  readonly edits: readonly ReviewedEdit[]
  readonly counted: readonly ReviewedEdit[]
  readonly existing: readonly MemoryExample[]
}
