import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph'
import type { ScoredChar } from './ScoredChar'
import type { ScoredWord } from './ScoredWord'

/** Cuts the final text at whitespace; a word is as reliable as its weakest character. */
export function groupScoredWords(
  paragraph: TranscriptParagraph,
  text: string,
  chars: readonly ScoredChar[],
): ScoredWord[] {
  const words: ScoredWord[] = []
  let cursor = 0
  for (const match of text.matchAll(/\S+/gu)) {
    const length = Array.from(match[0]).length
    const part = chars.slice(cursor, cursor + length)
    cursor += length
    words.push({
      text: match[0],
      score: Math.min(...part.map((char) => char.score)),
      start: paragraph.words[part[0]?.wordIndex ?? 0]?.start ?? paragraph.start,
    })
  }
  return words
}
