import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { ReviewControls } from '../review/ReviewControls'

export type BarVerdictButtonProps = {
  readonly editId: string
  readonly target: ReviewVerdict
  readonly controls: ReviewControls
}
