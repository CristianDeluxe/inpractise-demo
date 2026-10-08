import type { PlaceableEdit } from './PlaceableEdit'

/** A slice of the raw paragraph: plain text, or the `from` one edit rewrites. */
export type EditSegment<T extends PlaceableEdit> = {
  readonly text: string
  readonly edit: T | null
}
