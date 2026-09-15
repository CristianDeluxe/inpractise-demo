import type { CitationSource } from '../citations/CitationSource.ts'
import type { ComparisonSide } from './ComparisonSide.ts'

export type BuildCompareSideInput = {
  side: ComparisonSide
  sources: readonly CitationSource[]
  offset: number
  prefix: string
  stillAuthorised: ReadonlySet<string>
  candidateCount: number
}
