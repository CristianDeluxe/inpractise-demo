import { wholeWordStarts } from '@/transcripts/edits/wholeWordStarts.ts'
import { changedRawRanges } from './changedRawRanges.ts'
import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import { surroundsInModel } from './surroundsInModel.ts'

/**
 * Which occurrence of `from` in the raw paragraph the model rewrote. The model
 * reports text, not positions, so occurrences whose words its text no longer
 * keeps come first (a word diff survives other, unreported changes nearby);
 * among those, or failing them, the one whose neighbours surround `to` in the
 * model's text; otherwise the first.
 */
export function modelEditStart(
  raw: string,
  edit: CorrectionEditDraft,
  modelText: string,
): number | undefined {
  const starts = wholeWordStarts(raw, edit.from)
  const changed = changedRawRanges(raw, modelText)
  const touched = starts.filter((start) =>
    changed.some(
      (range) => start < range.end && start + edit.from.length > range.start,
    ),
  )
  const pool = touched.length > 0 ? touched : starts
  return (
    pool.find((start) => surroundsInModel(raw, start, edit, modelText)) ??
    pool[0]
  )
}
