import type { ReviewFilter } from './ReviewFilter'
import type { ReviewMode } from './ReviewMode'

/** The final text always shows every paragraph, and spot-check only those with something to check. */
export function effectiveFilter(
  mode: ReviewMode,
  filter: ReviewFilter,
): ReviewFilter {
  if (mode === 'final') return 'all'
  if (mode === 'spotcheck') return 'spotcheck'
  return filter
}
