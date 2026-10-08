import { useMemo } from 'react'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewFilter } from '../review/ReviewFilter'

export function useVisibleParagraphs(
  paragraphs: readonly TranscriptParagraph[],
  flaggedIds: readonly string[],
  filter: ReviewFilter,
) {
  return useMemo(() => {
    if (filter === 'all') return paragraphs
    const flagged = new Set(flaggedIds)
    return paragraphs.filter((paragraph) => flagged.has(paragraph.id))
  }, [paragraphs, flaggedIds, filter])
}
