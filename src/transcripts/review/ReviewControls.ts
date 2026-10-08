import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { DecisionMap } from './DecisionMap'

/** Everything a paragraph needs to act on the review without knowing where state lives. */
export type ReviewControls = {
  readonly seek: (seconds: number) => void
  readonly decisions: DecisionMap
  readonly decide: (
    editIds: readonly string[],
    verdict: ReviewVerdict | null,
  ) => void
  readonly focusedEditId: string | null
  readonly focusEdit: (editId: string) => void
}
