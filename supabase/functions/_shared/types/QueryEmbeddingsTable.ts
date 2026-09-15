import type { QueryEmbeddingsInsert } from './QueryEmbeddingsInsert.ts'
import type { QueryEmbeddingsRow } from './QueryEmbeddingsRow.ts'

export type QueryEmbeddingsTable = {
  Row: QueryEmbeddingsRow
  Insert: QueryEmbeddingsInsert
  Update: never
  Relationships: []
}
