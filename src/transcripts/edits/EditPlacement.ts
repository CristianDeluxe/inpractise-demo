import type { PlaceableEdit } from './PlaceableEdit'

/** Where one occurrence of an edit's `from` sits in the raw paragraph text. */
export type EditPlacement<T extends PlaceableEdit> = {
  readonly edit: T
  readonly start: number
  readonly end: number
}
