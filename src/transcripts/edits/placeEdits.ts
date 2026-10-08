import { candidateStarts } from './candidateStarts'
import type { EditPlacement } from './EditPlacement'
import { overlapsPlacement } from './overlapsPlacement'
import type { PlaceableEdit } from './PlaceableEdit'

/**
 * Pins every edit to a position in the raw paragraph, so review marks, reverts,
 * exports and learned examples all touch the same words. Edits that cannot be
 * placed without overlapping an earlier one are left out.
 */
export function placeEdits<T extends PlaceableEdit>(
  raw: string,
  edits: readonly T[],
): EditPlacement<T>[] {
  const placed: EditPlacement<T>[] = []
  for (const edit of edits) {
    const { starts, every } = candidateStarts(raw, edit)
    const free = starts.filter(
      (start) => !overlapsPlacement(placed, start, start + edit.from.length),
    )
    for (const start of every ? free : free.slice(0, 1)) {
      placed.push({ edit, start, end: start + edit.from.length })
    }
  }
  return placed.toSorted((a, b) => a.start - b.start)
}
