import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'

/**
 * Joins the segments with `to` for the edits that apply and `from` for the rest.
 * Raw text has single spaces and punctuation attached to words, so a removed
 * word only ever leaves a double space or a space before punctuation behind.
 */
export function composeText<T extends PlaceableEdit>(
  segments: readonly EditSegment<T>[],
  applies: (edit: T) => boolean,
): string {
  return segments
    .map((segment) =>
      segment.edit !== null && applies(segment.edit)
        ? segment.edit.to
        : segment.text,
    )
    .join('')
    .replace(/ {2,}/g, ' ')
    .replace(/ ([,.;:!?])/g, '$1')
    .trim()
}
