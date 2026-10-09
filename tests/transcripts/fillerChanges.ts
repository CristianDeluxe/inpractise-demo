import { paragraphFillerEdits } from '../../scripts/transcripts/paragraphFillerEdits.ts'

/** [from, to, at] of the filler edits for a paragraph written as one space-separated string. */
export function fillerChanges(text: string) {
  return paragraphFillerEdits('p1', text.split(' '), []).map((edit) => [
    edit.from,
    edit.to,
    edit.at,
  ])
}
