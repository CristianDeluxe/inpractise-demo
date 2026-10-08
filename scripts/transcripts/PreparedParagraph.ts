import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'

export type PreparedParagraph = {
  readonly id: string
  readonly raw: string
  /** Raw text after the memory pass. */
  readonly text: string
  /** Post-memory text with uncertain words marked inline. */
  readonly marked: string
  readonly memoryEdits: readonly CorrectionEditDraft[]
}
