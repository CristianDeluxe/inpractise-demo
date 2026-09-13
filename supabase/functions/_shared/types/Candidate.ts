export type Candidate = {
  key: string
  orgId: string
  documentId: string
  revisionId: string
  passageId: string
  text: string
  tokenCount: number
  lexicalRank: number | null
  vectorRank: number | null
  lexicalScore: number | null
  cosineDistance: number | null
  fusionScore: number
}
