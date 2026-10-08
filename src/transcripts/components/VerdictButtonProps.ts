import type { ReviewVerdict } from '../contracts/ReviewVerdict'

export type VerdictButtonProps = {
  readonly target: ReviewVerdict
  readonly verdict: ReviewVerdict | undefined
  readonly onDecide: (verdict: ReviewVerdict | null) => void
}
