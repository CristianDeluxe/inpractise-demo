import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { retrievalDiagnostics } from '../answer/retrievalDiagnostics.ts'
import type { CitationSource } from '../citations/CitationSource.ts'

/** What one side of a cross-reference retrieved, kept and could read. */
export type SideRetrieval = {
  mode: 'hybrid' | 'lexical_only'
  candidates: readonly Candidate[]
  selected: readonly Candidate[]
  sources: readonly CitationSource[]
  record: ReturnType<typeof retrievalDiagnostics>
}
