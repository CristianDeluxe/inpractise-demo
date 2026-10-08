import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import { modelEditStart } from './modelEditStart.ts'

/** Records the raw offset each model edit rewrites, so every later step touches the same words. */
export function locateModelEdits(
  raw: string,
  edits: readonly CorrectionEditDraft[],
  modelText: string,
): CorrectionEditDraft[] {
  return edits.flatMap((edit) => {
    const start = modelEditStart(raw, edit, modelText)
    return start === undefined ? [] : [{ ...edit, at: [start] }]
  })
}
