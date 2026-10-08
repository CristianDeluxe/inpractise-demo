import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { CharRange } from '../edits/CharRange'
import { wordsTouching } from '../edits/wordsTouching'
import type { TimeInterval } from './TimeInterval'

/** Audio span of the raw words a placed edit rewrites. */
export function placementInterval(
  paragraph: TranscriptParagraph,
  range: CharRange,
): TimeInterval | null {
  const touched = wordsTouching(
    paragraph.words.map((word) => word.text),
    [range],
  )
  const first = paragraph.words[touched.indexOf(true)]
  const last = paragraph.words[touched.lastIndexOf(true)]
  return first && last ? { start: first.start, end: last.end } : null
}
