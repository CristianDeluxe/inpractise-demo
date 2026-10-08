import type { EditOrigin } from '../contracts/EditOrigin'

/** The fields placement needs; review, export and learning each carry more. */
export type PlaceableEdit = {
  readonly from: string
  readonly to: string
  readonly origin?: EditOrigin | undefined
  readonly at?: readonly number[] | undefined
}
