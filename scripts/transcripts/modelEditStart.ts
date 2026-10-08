import { wholeWordStarts } from '@/transcripts/edits/wholeWordStarts.ts'
import { contextWords } from './contextWords.ts'
import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'

/**
 * Which occurrence of `from` in the raw paragraph the model rewrote: the first
 * whose neighbouring raw words surround `to` in the model's own text, otherwise
 * the first occurrence. The model reports text, not positions.
 */
export function modelEditStart(
  raw: string,
  edit: CorrectionEditDraft,
  modelText: string,
): number | undefined {
  const starts = wholeWordStarts(raw, edit.from)
  const surrounded = starts.find((start) => {
    const probe = [
      contextWords(raw.slice(0, start), 'before', 2),
      edit.to,
      contextWords(raw.slice(start + edit.from.length), 'after', 2),
    ]
      .filter((part) => part !== '')
      .join(' ')
    return modelText.includes(probe)
  })
  return surrounded ?? starts[0]
}
