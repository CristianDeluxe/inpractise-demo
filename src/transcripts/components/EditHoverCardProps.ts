import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { EditPreview } from '../review/EditPreview'

export type EditHoverCardProps = {
  readonly preview: EditPreview
  readonly edit: CorrectionEdit
  readonly verdict: ReviewVerdict | undefined
  readonly onDecide: (verdict: ReviewVerdict | null) => void
  readonly onHold: () => void
  readonly onRelease: () => void
}
