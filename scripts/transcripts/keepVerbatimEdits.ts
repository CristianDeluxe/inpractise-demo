import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import { locateVerbatim } from './locateVerbatim.ts'
import type { ModelEdit } from './ModelEdit.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'
import type { VerbatimEdits } from './VerbatimEdits.ts'

/** Ignores no-op edits, then keeps edits whose `from` resolves to the same verbatim span in both the raw and the post-memory paragraph. */
export function keepVerbatimEdits(
  paragraph: PreparedParagraph,
  proposed: readonly ModelEdit[],
): VerbatimEdits {
  const changes = proposed.filter((edit) => edit.from.trim() !== edit.to.trim())
  const valid = changes.flatMap((edit): ModelEdit[] => {
    const from = locateVerbatim(paragraph.text, edit.from)
    if (from === undefined || from === edit.to) return []
    return paragraph.raw.includes(from) ? [{ ...edit, from }] : []
  })
  const edits = valid
    .toSorted(
      (a, b) => paragraph.text.indexOf(a.from) - paragraph.text.indexOf(b.from),
    )
    .map((edit): CorrectionEditDraft => ({
      paragraphId: paragraph.id,
      from: edit.from,
      to: edit.to,
      category: edit.category,
      origin: 'model',
      reason: edit.reason,
      confidence: Math.min(1, Math.max(0, edit.confidence)),
    }))
  return { edits, dropped: changes.length - valid.length }
}
