export type QueryEmbeddingsRow = {
  cache_key: string
  model: string
  /** PostgREST renders a pgvector column as its bracketed text form. */
  embedding: string
  created_at: string
}
