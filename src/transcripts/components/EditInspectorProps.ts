import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type EditInspectorProps = {
  readonly edits: readonly CorrectionEdit[]
  readonly startById: ReadonlyMap<string, number>
  readonly controls: ReviewControls
}
