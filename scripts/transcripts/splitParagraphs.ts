import type { MergedWord } from './MergedWord.ts'
import { paragraphLimits } from './paragraphLimits.ts'
import type { ParagraphRange } from './ParagraphRange.ts'

/** Breaks only at sentence starts: after a long pause, or once the paragraph is long. */
export function splitParagraphs(
  words: readonly MergedWord[],
): ParagraphRange[] {
  const ranges: ParagraphRange[] = []
  let from = 0
  words.forEach((word, index) => {
    const previous = words[index - 1]
    if (index === from || previous === undefined || !word.sentenceStart) return
    const paused = word.start - previous.end > paragraphLimits.gapSeconds
    const long = index - from > paragraphLimits.maxWords
    if (!paused && !long) return
    ranges.push({ from, to: index })
    from = index
  })
  if (words.length > from) ranges.push({ from, to: words.length })
  return ranges
}
