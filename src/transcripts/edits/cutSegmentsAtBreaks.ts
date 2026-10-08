import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'
import { rowOfOffset } from './rowOfOffset'

/** Groups the segments into rows, cutting plain runs at each break. */
export function cutSegmentsAtBreaks<T extends PlaceableEdit>(
  segments: readonly EditSegment<T>[],
  breaks: readonly number[],
): EditSegment<T>[][] {
  const rows: EditSegment<T>[][] = Array.from(
    { length: breaks.length + 1 },
    () => [],
  )
  let offset = 0
  for (const segment of segments) {
    const end = offset + segment.text.length
    const cuts = segment.edit
      ? []
      : breaks.filter((point) => point > offset && point < end)
    let from = offset
    for (const stop of [...cuts, end]) {
      if (stop > from)
        rows[rowOfOffset(breaks, from)]?.push({
          text: segment.text.slice(from - offset, stop - offset),
          edit: segment.edit,
        })
      from = stop
    }
    offset = end
  }
  return rows
}
