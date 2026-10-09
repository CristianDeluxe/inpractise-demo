import type { CharRange } from './CharRange.ts'
import { occurrenceStarts } from './occurrenceStarts.ts'
import type { PositionedText } from './PositionedText.ts'

/** Every place an existing edit may apply: its recorded offsets, else each occurrence of its text. */
export function editRanges(
  raw: string,
  edits: readonly PositionedText[],
): CharRange[] {
  return edits.flatMap((edit) =>
    (edit.at ?? occurrenceStarts(raw, edit.from)).map((start) => ({
      start,
      end: start + edit.from.length,
    })),
  )
}
