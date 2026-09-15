import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import type { SubQuestion } from './SubQuestion.ts'

/**
 * What one retrieval step established for one sub-question: every ranked
 * candidate, the ones context selection kept, and the kept ones the caller
 * could still read. `originalQuestion` is set when a refinement replaced the
 * planned question.
 */
export type SubQuestionEvidence = {
  subQuestion: SubQuestion
  originalQuestion?: string
  mode: 'hybrid' | 'lexical_only'
  candidates: readonly Candidate[]
  selected: readonly Candidate[]
  sources: readonly CitationSource[]
}
