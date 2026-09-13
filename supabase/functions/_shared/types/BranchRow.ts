export type BranchRow = {
  org_id: string
  document_id: string
  revision_id: string
  passage_id: string
  branch: 'fts' | 'vector'
  rank: number
  lexical_score: number | null
  cosine_distance: number | null
}
