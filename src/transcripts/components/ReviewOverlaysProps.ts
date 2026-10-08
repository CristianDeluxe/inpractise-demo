import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { EditPreviewApi } from '../hooks/EditPreviewApi'
import type { ReviewControls } from '../review/ReviewControls'

export type ReviewOverlaysProps = {
  readonly focusedEdit: CorrectionEdit | undefined
  readonly preview: EditPreviewApi
  readonly edits: readonly CorrectionEdit[]
  readonly controls: ReviewControls
}
