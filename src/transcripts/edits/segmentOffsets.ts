import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'

/** Where each segment starts in the text the segments were cut from. */
export function segmentOffsets<T extends PlaceableEdit>(
  segments: readonly EditSegment<T>[],
): number[] {
  let offset = 0
  return segments.map((segment) => {
    const start = offset
    offset += segment.text.length
    return start
  })
}
