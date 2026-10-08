import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'

/** Drops the breaks that fall inside an edit, which is never cut across rows. */
export function breaksOutsideEdits<T extends PlaceableEdit>(
  segments: readonly EditSegment<T>[],
  breaks: readonly number[],
): number[] {
  const inside = new Set<number>()
  let offset = 0
  for (const segment of segments) {
    const end = offset + segment.text.length
    if (segment.edit) {
      for (const point of breaks)
        if (point > offset && point < end) inside.add(point)
    }
    offset = end
  }
  return breaks.filter((point) => !inside.has(point))
}
