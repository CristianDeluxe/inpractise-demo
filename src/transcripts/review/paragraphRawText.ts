import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

export function paragraphRawText(paragraph: TranscriptParagraph) {
  return paragraph.words.map((word) => word.text).join(' ')
}
