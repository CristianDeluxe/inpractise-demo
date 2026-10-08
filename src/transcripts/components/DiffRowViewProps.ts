import type { DiffRow } from '../edits/DiffRow'
import type { ReviewControls } from '../review/ReviewControls'

export type DiffRowViewProps = {
  readonly row: DiffRow
  /** Struck flags for the whole paragraph; the row takes its own slice. */
  readonly struck: readonly boolean[]
  readonly focused: boolean
  readonly controls: ReviewControls
}
