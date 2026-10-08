import type { ReviewVerdict } from '../contracts/ReviewVerdict'

export type VerdictButtonsProps = {
  readonly verdict: ReviewVerdict | undefined
  readonly onDecide: (verdict: ReviewVerdict | null) => void
}
