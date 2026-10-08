import type { EditSegment } from './EditSegment'
import { joinAfterRemoval } from './joinAfterRemoval'
import type { PlaceableEdit } from './PlaceableEdit'

/**
 * Joins the segments with `to` for the edits that apply and `from` for the
 * rest. Spacing is repaired only where an applied edit removed text; the raw
 * text elsewhere is left exactly as it was.
 */
export function composeText<T extends PlaceableEdit>(
  segments: readonly EditSegment<T>[],
  applies: (edit: T) => boolean,
): string {
  let text = ''
  let removed = false
  for (const segment of segments) {
    const { edit } = segment
    const applied = edit !== null && applies(edit)
    const piece = applied ? edit.to : segment.text
    if (applied && piece === '') {
      removed = true
      continue
    }
    text = removed ? joinAfterRemoval(text, piece) : text + piece
    removed = false
  }
  return removed ? text.trimEnd() : text
}
