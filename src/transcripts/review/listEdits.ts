import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { CorrectionRun } from '../contracts/CorrectionRun'

export function listEdits(correction: CorrectionRun | null): CorrectionEdit[] {
  return (correction?.paragraphs ?? []).flatMap((paragraph) => paragraph.edits)
}
