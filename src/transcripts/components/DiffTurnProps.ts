import type { DiffRow } from '../edits/DiffRow'
import type { ReviewControls } from '../review/ReviewControls'

export type DiffTurnProps = {
  readonly turn: DiffRow
  /** Struck flags for the whole paragraph; the turn takes its own slice. */
  readonly struck: readonly boolean[]
  readonly controls: ReviewControls
}
