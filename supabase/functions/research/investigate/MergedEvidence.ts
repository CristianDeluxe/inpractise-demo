import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { CitationSource } from '../citations/CitationSource.ts'

/**
 * The passages synthesis is shown, in label order, and for each passage key
 * the sub-questions whose selection contained it. `candidates` and `sources`
 * are parallel arrays.
 */
export type MergedEvidence = {
  candidates: readonly Candidate[]
  sources: readonly CitationSource[]
  attribution: ReadonlyMap<string, readonly number[]>
}
