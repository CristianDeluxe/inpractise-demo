import type { EditPlacement } from './EditPlacement'
import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'

/** Cuts the raw paragraph at each placement, in reading order. */
export function segmentRaw<T extends PlaceableEdit>(
  raw: string,
  placements: readonly EditPlacement<T>[],
): EditSegment<T>[] {
  const segments: EditSegment<T>[] = []
  let offset = 0
  for (const placement of placements) {
    if (placement.start > offset)
      segments.push({ text: raw.slice(offset, placement.start), edit: null })
    segments.push({ text: placement.edit.from, edit: placement.edit })
    offset = placement.end
  }
  if (offset < raw.length)
    segments.push({ text: raw.slice(offset), edit: null })
  return segments
}
