import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

export function paragraphStarts(paragraphs: readonly TranscriptParagraph[]) {
  return new Map(paragraphs.map((paragraph) => [paragraph.id, paragraph.start]))
}
