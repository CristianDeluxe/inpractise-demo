/** Identity is never supplied: user_id defaults to auth.uid() in the database. */
export type ResearchNotesInsert = {
  org_id: string
  document_id: string
  revision_id: string
  passage_id: string
  question?: string | null
  note?: string | null
}
