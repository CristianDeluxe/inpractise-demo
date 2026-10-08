import type { EpisodeCorrection } from './EpisodeCorrection.ts'

/** Edits the correction run proposed; 0 without one. */
export function countProposedEdits(
  correction: EpisodeCorrection | null,
): number {
  if (correction === null) return 0
  return correction.paragraphs.reduce(
    (total, paragraph) => total + paragraph.edits.length,
    0,
  )
}
