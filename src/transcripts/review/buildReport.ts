import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { correctedParagraphMap } from './correctedParagraphMap'
import type { DecisionMap } from './DecisionMap'
import { paragraphRawText } from './paragraphRawText'
import type { ReportParagraph } from './ReportParagraph'
import { revertRejectedEdits } from './revertRejectedEdits'

/** Corrected text per paragraph with rejected edits reverted; raw text where no correction exists. */
export function buildReport(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
): ReportParagraph[] {
  const corrected = correctedParagraphMap(correction)
  return transcript.paragraphs.map((paragraph) => {
    const run = corrected.get(paragraph.id)
    return {
      id: paragraph.id,
      start: paragraph.start,
      text: run
        ? revertRejectedEdits(run.text, run.edits, decisions)
        : paragraphRawText(paragraph),
    }
  })
}
