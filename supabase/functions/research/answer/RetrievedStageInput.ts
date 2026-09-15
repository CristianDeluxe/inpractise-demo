import type { Candidate } from '../../_shared/types/Candidate.ts'

export type RetrievedStageInput = {
  mode: 'hybrid' | 'lexical_only'
  candidateAt10: readonly string[]
  candidates: readonly Candidate[]
  detailed: boolean
}
