import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph.ts'
import type { TranscriptWord } from '@/transcripts/contracts/TranscriptWord.ts'
import { paragraphIdFor } from './paragraphIdFor.ts'
import type { ParagraphRange } from './ParagraphRange.ts'

export function buildParagraphs(
  words: readonly TranscriptWord[],
  ranges: readonly ParagraphRange[],
): TranscriptParagraph[] {
  return ranges.map((range, position) => {
    const slice = words.slice(range.from, range.to)
    return {
      id: paragraphIdFor(position + 1),
      start: slice[0]?.start ?? 0,
      end: slice.at(-1)?.end ?? 0,
      words: slice,
    }
  })
}
