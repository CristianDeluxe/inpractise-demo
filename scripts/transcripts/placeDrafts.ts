import { composeText } from '@/transcripts/edits/composeText.ts'
import { placeEdits } from '@/transcripts/edits/placeEdits.ts'
import { segmentRaw } from '@/transcripts/edits/segmentRaw.ts'
import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'

/** The drafts that fit in the raw paragraph without overlapping, and the text they produce together. */
export function placeDrafts(
  raw: string,
  drafts: readonly CorrectionEditDraft[],
) {
  const placements = placeEdits(raw, drafts)
  const placed = new Set(placements.map((placement) => placement.edit))
  return {
    edits: drafts.filter((draft) => placed.has(draft)),
    text: composeText(segmentRaw(raw, placements), () => true),
  }
}
