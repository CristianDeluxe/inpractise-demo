import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import type { EditSegment } from '@/transcripts/edits/EditSegment'
import { editCharScores } from './editCharScores'
import { rawCharScores } from './rawCharScores'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'

/** Scores every visible character of the final text, in reading order. */
export function scoreSegments(
  context: ScoringContext,
  segments: readonly EditSegment<CorrectionEdit>[],
): ScoredChar[] {
  const scored: ScoredChar[] = []
  let offset = 0
  for (const { text, edit } of segments) {
    scored.push(
      ...(edit === null
        ? rawCharScores(context, text, offset, 1)
        : editCharScores(context, edit, offset)),
    )
    offset += text.length
  }
  return scored
}
