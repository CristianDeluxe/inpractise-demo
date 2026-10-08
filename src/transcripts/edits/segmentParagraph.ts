import type { EditSegment } from './EditSegment'
import type { PlaceableEdit } from './PlaceableEdit'
import { placeEdits } from './placeEdits'
import { segmentRaw } from './segmentRaw'

export function segmentParagraph<T extends PlaceableEdit>(
  raw: string,
  edits: readonly T[],
): EditSegment<T>[] {
  return segmentRaw(raw, placeEdits(raw, edits))
}
