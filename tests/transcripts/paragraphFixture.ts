import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph.ts'
import { transcriptWordFixture } from './transcriptWordFixture.ts'

/** A paragraph of words; the word at lowIndex is low-band at 0.81. */
export function paragraphFixture(
  texts: readonly string[],
  lowIndex?: number,
): TranscriptParagraph {
  return {
    id: 'p0001',
    start: 0,
    end: 1,
    words: texts.map((text, index) =>
      index === lowIndex
        ? transcriptWordFixture(text, { band: 'low', confidence: 0.81 })
        : transcriptWordFixture(text),
    ),
  }
}
