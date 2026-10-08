import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { segmentParagraph } from '../edits/segmentParagraph'
import type { DecisionMap } from './DecisionMap'
import type { ReportSegment } from './ReportSegment'

/**
 * The raw paragraph cut into runs: plain text, accepted wording, and wording
 * still pending or flagged for later. A pending removal keeps its raw words,
 * marked, so nothing disappears unreviewed; rejected edits stay raw.
 */
export function reportSegments(
  raw: string,
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): ReportSegment[] {
  const segments: ReportSegment[] = []
  for (const segment of segmentParagraph(raw, edits)) {
    const { edit } = segment
    const verdict = edit ? decisions.get(edit.id) : undefined
    const applied = edit !== null && verdict !== 'rejected'
    const pending = applied && verdict !== 'accepted'
    const text = applied ? edit.to : segment.text
    if (pending && text === '')
      segments.push({ text: segment.text, pending, removed: true })
    else if (text !== '') segments.push({ text, pending, removed: false })
  }
  return segments
}
