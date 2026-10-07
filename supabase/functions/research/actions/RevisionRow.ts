/** One `document_revisions` row as read for the currency check. */
export type RevisionRow = {
  document_id: string
  revision_id: string
  is_current: boolean
}
