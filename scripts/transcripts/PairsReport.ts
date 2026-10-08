import type { HunkTally } from './HunkTally.ts'
import type { PairAnalysis } from './PairAnalysis.ts'

export type PairsReport = {
  readonly analyses: readonly PairAnalysis[]
  readonly tallies: readonly HunkTally[]
  readonly entriesWritten: number
  readonly examplesWritten: number
  readonly dryRun: boolean
}
