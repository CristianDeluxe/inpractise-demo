import type { MarkRect } from '../review/MarkRect'

/** The last measured rect and the edit it belongs to. */
export type MarkRectState = {
  readonly editId: string
  readonly rect: MarkRect | null
}
