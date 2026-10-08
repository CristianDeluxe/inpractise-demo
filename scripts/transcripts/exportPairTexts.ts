import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision.ts'
import type { z } from 'zod'
import { applyAcceptedEdits } from './applyAcceptedEdits.ts'
import { attachVerdicts } from './attachVerdicts.ts'
import type { CorrectionRunSchema } from './CorrectionRunSchema.ts'
import type { ExportParagraph } from './ExportParagraph.ts'
import type { PairText } from './PairText.ts'

/** Raw text per paragraph, and the same text with only the accepted edits applied; unreported model changes are left out. */
export function exportPairTexts(
  id: string,
  paragraphs: readonly ExportParagraph[],
  run: z.infer<typeof CorrectionRunSchema>,
  decisions: readonly ReviewDecision[],
): PairText {
  const edits = attachVerdicts(run, decisions)
  const finals = paragraphs.map((paragraph) =>
    applyAcceptedEdits(
      paragraph.raw,
      edits.filter((edit) => edit.paragraphId === paragraph.id),
    ),
  )
  return {
    name: id,
    raw: paragraphs.map((paragraph) => paragraph.raw).join('\n\n'),
    final: finals.join('\n\n'),
  }
}
