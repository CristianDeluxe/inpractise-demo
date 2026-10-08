import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { EditPreviewApi } from '../hooks/EditPreviewApi'
import type { ReviewControls } from '../review/ReviewControls'
import type { TimeInterval } from '../review/TimeInterval'

export type ReviewOverlaysProps = {
  readonly focusedEdit: CorrectionEdit | undefined
  readonly preview: EditPreviewApi
  readonly edits: readonly CorrectionEdit[]
  readonly spanById: ReadonlyMap<string, TimeInterval>
  readonly controls: ReviewControls
}
