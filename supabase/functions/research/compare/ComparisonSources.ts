import type { CitationSource } from '../citations/CitationSource.ts'

/** The interview and filing passages a cross-reference is generated from. */
export type ComparisonSources = {
  interviews: readonly CitationSource[]
  filings: readonly CitationSource[]
}
