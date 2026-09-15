/**
 * One part of the question as the answer reports it: the question retrieval
 * finally ran on, what it found, and whether the corpus could establish it.
 * `citationIds` are the answer's own citations attributed to this part.
 */
export type SubQuestionResult = {
  index: number
  question: string
  company?: string
  originalQuestion?: string
  status: 'answered' | 'partial' | 'not_found'
  mode: 'hybrid' | 'lexical_only'
  candidateCount: number
  selectedCount: number
  suppliedCount: number
  citationIds: string[]
}
