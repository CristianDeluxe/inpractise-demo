import type { DecisionMap } from '../review/DecisionMap'
import type { ReviewDerived } from '../review/ReviewDerived'
import type { ReviewMode } from '../review/ReviewMode'
import { reviewScope } from '../review/reviewScope'
import { useReviewFocus } from './useReviewFocus'

/** The keyboard focus, limited to the edits the current view covers. */
export function useModeFocus(
  mode: ReviewMode,
  derived: ReviewDerived,
  decisions: DecisionMap,
) {
  const { activeEdits, stepIds } = reviewScope(mode, derived)
  const focusApi = useReviewFocus({
    flaggedIds: stepIds,
    edits: activeEdits,
    decisions,
  })
  return { activeEdits, focusApi }
}
