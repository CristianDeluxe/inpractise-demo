/** What one retrieval step found and kept, in counts; identifiers only for a
 * principal the endpoint already discloses them to. */
export type RetrievalSummary = {
  mode: 'hybrid' | 'lexical_only'
  candidateCount: number
  selectedCount: number
  suppliedCount: number
  selectedTokens: number
  candidateAt10?: readonly string[]
  selectedIds?: readonly string[]
}
