export type PassagesInsert = {
  document_id: string
  embedding?: string | null
  embedding_model: string
  ordinal: number
  org_id: string
  passage_id: string
  revision_id: string
  search_vector?: unknown
  section: string
  speaker?: string | null
  speaker_role?: string | null
  text_content: string
  token_count: number
}
