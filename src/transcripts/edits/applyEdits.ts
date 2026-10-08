import { composeText } from './composeText'
import type { PlaceableEdit } from './PlaceableEdit'
import { segmentParagraph } from './segmentParagraph'

/** The raw paragraph with the chosen edits written at their placed positions. */
export function applyEdits<T extends PlaceableEdit>(
  raw: string,
  edits: readonly T[],
  applies: (edit: T) => boolean,
): string {
  return composeText(segmentParagraph(raw, edits), applies)
}
