import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { DecisionMap } from '../review/DecisionMap'
import type { ReviewFocus } from '../review/ReviewFocus'

export type UseReviewActionsInput = {
  readonly decisions: DecisionMap
  readonly decide: (
    editIds: readonly string[],
    verdict: ReviewVerdict | null,
  ) => void
  readonly focus: ReviewFocus
  readonly focusEdit: (editId: string) => void
  readonly moveParagraph: (step: 1 | -1) => void
  readonly advance: (afterId: string, decided: DecisionMap) => void
  readonly seekTo: (seconds: number) => Promise<void>
}
