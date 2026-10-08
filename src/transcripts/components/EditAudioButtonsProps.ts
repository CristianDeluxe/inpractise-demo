import type { ReviewControls } from '../review/ReviewControls'
import type { TimeInterval } from '../review/TimeInterval'

export type EditAudioButtonsProps = {
  readonly editId: string
  readonly span: TimeInterval | undefined
  readonly controls: ReviewControls
}
