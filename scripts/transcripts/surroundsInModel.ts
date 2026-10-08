import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import { contextWords } from './contextWords.ts'

/** True when the raw words around this occurrence also surround `to` in the model's text. */
export function surroundsInModel(
  raw: string,
  start: number,
  edit: CorrectionEditDraft,
  modelText: string,
): boolean {
  const probe = [
    contextWords(raw.slice(0, start), 'before', 2),
    edit.to,
    contextWords(raw.slice(start + edit.from.length), 'after', 2),
  ]
    .filter((part) => part !== '')
    .join(' ')
  return modelText.includes(probe)
}
