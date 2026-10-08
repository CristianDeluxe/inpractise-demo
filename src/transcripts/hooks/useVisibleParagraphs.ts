import { useMemo } from 'react'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ParagraphFilterSets } from '../review/ParagraphFilterSets'
import type { ReviewFilter } from '../review/ReviewFilter'

export function useVisibleParagraphs(
  paragraphs: readonly TranscriptParagraph[],
  sets: ParagraphFilterSets,
  filter: ReviewFilter,
) {
  return useMemo(() => {
    if (filter === 'all') return paragraphs
    const keep = sets[filter]
    return paragraphs.filter((paragraph) => keep.has(paragraph.id))
  }, [paragraphs, sets, filter])
}
