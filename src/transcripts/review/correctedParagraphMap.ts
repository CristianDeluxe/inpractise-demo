import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { CorrectionRun } from '../contracts/CorrectionRun'

export function correctedParagraphMap(
  correction: CorrectionRun | null,
): ReadonlyMap<string, CorrectedParagraph> {
  return new Map(
    (correction?.paragraphs ?? []).map((paragraph) => [
      paragraph.paragraphId,
      paragraph,
    ]),
  )
}
