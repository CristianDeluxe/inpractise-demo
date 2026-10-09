import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'
import type { TimeInterval } from '../review/TimeInterval'

export type EditInspectorProps = {
  readonly edits: readonly CorrectionEdit[]
  readonly spanById: ReadonlyMap<string, TimeInterval>
  /** The edit under the pointer; the inspector previews it instead of a floating card. */
  readonly previewId: string | null
  readonly controls: ReviewControls
  /** In the side rail, which already sticks as a whole. */
  readonly inRail?: boolean
}
