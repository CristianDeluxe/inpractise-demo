import { correctionEditsSchema } from './correctionEditsSchema.ts'

/** Proposed edits in a correction run; 0 when there is none or it is unreadable. */
export function countCorrectionEdits(correction: unknown): number {
  const parsed = correctionEditsSchema.safeParse(correction)
  if (!parsed.success) return 0
  return parsed.data.paragraphs.reduce(
    (sum, paragraph) => sum + paragraph.edits.length,
    0,
  )
}
