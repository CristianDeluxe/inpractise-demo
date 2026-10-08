import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type FocusedEditBarProps = {
  readonly edit: CorrectionEdit | undefined
  readonly controls: ReviewControls
  /** Viewport offset where the sticky console ends; the bar never slides under it. */
  readonly floor: number
}
