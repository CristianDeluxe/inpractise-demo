import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { locateEditRanges } from './locateEditRanges'
import type { TextSegment } from './TextSegment'

/** Splits corrected text into plain runs and the spans each edit wrote. */
export function segmentCorrectedText(
  text: string,
  edits: readonly CorrectionEdit[],
): TextSegment[] {
  const segments: TextSegment[] = []
  let offset = 0
  for (const range of locateEditRanges(text, edits)) {
    if (range.start > offset) {
      segments.push({ text: text.slice(offset, range.start), edit: null })
    }
    segments.push({
      text: text.slice(range.start, range.end),
      edit: range.edit,
    })
    offset = range.end
  }
  if (offset < text.length) {
    segments.push({ text: text.slice(offset), edit: null })
  }
  return segments
}
