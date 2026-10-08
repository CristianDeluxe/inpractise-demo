import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph.ts'

export function paragraphText(paragraph: TranscriptParagraph): string {
  return paragraph.words.map((word) => word.text).join(' ')
}
