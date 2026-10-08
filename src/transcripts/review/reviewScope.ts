import type { ReviewDerived } from './ReviewDerived'
import type { ReviewEditScope } from './ReviewEditScope'
import type { ReviewMode } from './ReviewMode'

/** Spot-check narrows the review to the edits the model was unsure of; every other view covers all of them. */
export function reviewScope(
  mode: ReviewMode,
  derived: ReviewDerived,
): ReviewEditScope {
  if (mode === 'spotcheck')
    return {
      activeEdits: derived.spotCheckEdits,
      stepIds: derived.spotCheckIds,
    }
  return { activeEdits: derived.edits, stepIds: derived.flaggedIds }
}
