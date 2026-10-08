import type { ClassifiedHunk } from './ClassifiedHunk.ts'
import type { Hunk } from './Hunk.ts'

export type PairAnalysis = {
  readonly name: string
  readonly rawWords: number
  readonly finalWords: number
  readonly hunks: readonly Hunk[]
  readonly classified: readonly ClassifiedHunk[]
  readonly wer: number
}
