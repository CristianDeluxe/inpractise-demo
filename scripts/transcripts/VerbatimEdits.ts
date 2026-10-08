import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'

export type VerbatimEdits = {
  readonly edits: CorrectionEditDraft[]
  readonly dropped: number
}
