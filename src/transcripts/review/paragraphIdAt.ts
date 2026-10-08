import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

/** The paragraph playing at `seconds`: the last one that has started. */
export function paragraphIdAt(
  paragraphs: readonly TranscriptParagraph[],
  seconds: number,
) {
  let found: string | null = null
  for (const paragraph of paragraphs) {
    if (paragraph.start > seconds) break
    found = paragraph.id
  }
  return found
}
