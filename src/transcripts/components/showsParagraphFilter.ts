import type { ReviewMode } from '../review/ReviewMode'

/** Only the raw-text views choose which paragraphs to show; the final and spot-check views decide for themselves. */
export function showsParagraphFilter(mode: ReviewMode): boolean {
  return mode !== 'final' && mode !== 'spotcheck'
}
