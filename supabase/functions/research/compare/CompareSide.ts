import type { Citation } from '../citations/Citation.ts'
import type { CompareClaim } from './CompareClaim.ts'

export type CompareSide = {
  status: 'answered' | 'partial' | 'not_found'
  claims: CompareClaim[]
  missingEvidence: string[]
  citations: Citation[]
  candidateCount: number
}
