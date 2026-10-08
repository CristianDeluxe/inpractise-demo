import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type ParagraphEditsProps = {
  readonly edits: readonly CorrectionEdit[]
  readonly controls: ReviewControls
}
