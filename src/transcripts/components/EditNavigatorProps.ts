import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type EditNavigatorProps = {
  readonly edits: readonly CorrectionEdit[]
  readonly editId: string
  readonly controls: ReviewControls
}
