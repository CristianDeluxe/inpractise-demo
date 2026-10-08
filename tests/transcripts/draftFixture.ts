import type { CorrectionEditDraft } from '../../scripts/transcripts/CorrectionEditDraft.ts'

export function draftFixture(from: string, to: string): CorrectionEditDraft {
  return {
    paragraphId: 'p0001',
    from,
    to,
    category: 'term',
    origin: 'model',
    reason: 'because',
    confidence: 0.9,
  }
}
