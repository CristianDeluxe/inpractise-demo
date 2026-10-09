import type { ReviewMode } from '../review/ReviewMode'

export type RailFooterProps = {
  readonly mode: ReviewMode
  readonly onOpenReport: () => void
}
