import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { correctedParagraphMap } from './correctedParagraphMap'
import type { DecisionMap } from './DecisionMap'
import { paragraphRawText } from './paragraphRawText'
import type { ReportParagraph } from './ReportParagraph'
import { reportSegments } from './reportSegments'
import { reviewedParagraphText } from './reviewedParagraphText'

/** Raw text per paragraph with every edit not rejected applied in place, pending wording marked; raw text where no correction exists. */
export function buildReport(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
): ReportParagraph[] {
  const corrected = correctedParagraphMap(correction)
  return transcript.paragraphs.map((paragraph) => {
    const run = corrected.get(paragraph.id)
    const raw = paragraphRawText(paragraph)
    return {
      id: paragraph.id,
      start: paragraph.start,
      text: run ? reviewedParagraphText(raw, run.edits, decisions) : raw,
      segments: run
        ? reportSegments(raw, run.edits, decisions)
        : [{ text: raw, pending: false, removed: false }],
    }
  })
}
