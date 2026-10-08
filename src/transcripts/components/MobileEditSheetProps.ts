import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'
import type { TimeInterval } from '../review/TimeInterval'

export type MobileEditSheetProps = {
  readonly edit: CorrectionEdit | undefined
  readonly edits: readonly CorrectionEdit[]
  readonly span: TimeInterval | undefined
  readonly controls: ReviewControls
}
