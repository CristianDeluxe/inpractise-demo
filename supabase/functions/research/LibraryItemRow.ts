/** A library row as read, with its passage count and joined documents. */
export type LibraryItemRow = {
  passages: { count: number }[]
  documents: unknown
}
