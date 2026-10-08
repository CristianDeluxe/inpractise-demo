import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'

export function correctedParagraphFixture(
  edits: readonly CorrectionEdit[],
  paragraphId = 'p0001',
): CorrectedParagraph {
  return { paragraphId, text: '', edits }
}
