import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph.ts'
import type { GlossaryMatch } from './GlossaryMatch.ts'
import { isUncertainWord } from './isUncertainWord.ts'
import type { Replacement } from './Replacement.ts'

/** [[word|0.81]] around uncertain words that no glossary match already covers. */
export function markReplacements(
  paragraph: TranscriptParagraph,
  matches: readonly GlossaryMatch[],
): Replacement[] {
  const marks: Replacement[] = []
  let start = 0
  for (const word of paragraph.words) {
    const end = start + word.text.length
    const covered = matches.some(
      (match) => start < match.end && end > match.start,
    )
    if (isUncertainWord(word) && !covered)
      marks.push({
        start,
        end,
        text: `[[${word.text}|${word.confidence.toFixed(2)}]]`,
      })
    start = end + 1
  }
  return marks
}
