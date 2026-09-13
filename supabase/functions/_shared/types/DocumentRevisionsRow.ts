import type { Json } from './Json.ts'

export type DocumentRevisionsRow = {
  canonical_content: string
  chunker_version: string
  company: string
  coverage: Json
  document_id: string
  embedding_model: string
  index_mode: string
  interview_date: string | null
  is_current: boolean
  kind: string
  normalized_sha256: string
  org_id: string
  origin: string
  parser_version: string
  passage_sha256: string
  published: boolean
  published_at: string
  raw_sha256: string
  report_date: string | null
  revision_id: string
  rights_basis: string
  rights_status: string
  source_url: string | null
  title: string
  withdrawn: boolean
}
