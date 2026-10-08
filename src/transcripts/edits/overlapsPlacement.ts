import type { EditPlacement } from './EditPlacement'
import type { PlaceableEdit } from './PlaceableEdit'

export function overlapsPlacement(
  placed: readonly EditPlacement<PlaceableEdit>[],
  start: number,
  end: number,
): boolean {
  return placed.some((item) => start < item.end && end > item.start)
}
