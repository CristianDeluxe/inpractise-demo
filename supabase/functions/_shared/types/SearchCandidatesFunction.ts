export type SearchCandidatesFunction = {
  Args: {
    candidate_limit?: number
    company_filter?: string
    kind_filter?: string
    query_embedding?: string
    query_text: string
  }
  Returns: {
    branch: string
    cosine_distance: number
    document_id: string
    lexical_score: number
    org_id: string
    passage_id: string
    rank: number
    revision_id: string
  }[]
}
