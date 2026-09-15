import { buildCompareSide } from './buildCompareSide.ts'
import { claimPrefixes } from './claimPrefixes.ts'
import type { CompareResult } from './CompareResult.ts'
import type { CompareScope } from './CompareScope.ts'
import type { Comparison } from './Comparison.ts'
import { resolveRelations } from './resolveRelations.ts'
import type { SidesRetrieval } from './SidesRetrieval.ts'

/** The published cross-reference: both sides after the recheck, then the relations that survive it. */
export function buildComparison(
  comparison: Comparison,
  sides: SidesRetrieval,
  stillAuthorised: ReadonlySet<string>,
  scope: CompareScope,
): CompareResult {
  const interviews = buildCompareSide({
    side: comparison.interviews,
    sources: sides.interviews.sources,
    offset: 0,
    prefix: claimPrefixes.interviews,
    stillAuthorised,
    candidateCount: sides.interviews.candidates.length,
  })
  const filings = buildCompareSide({
    side: comparison.filings,
    sources: sides.filings.sources,
    offset: sides.interviews.sources.length,
    prefix: claimPrefixes.filings,
    stillAuthorised,
    candidateCount: sides.filings.candidates.length,
  })
  return {
    ...scope,
    sides: { interviews, filings },
    relations: resolveRelations(
      comparison.relations,
      interviews.claims,
      filings.claims,
    ),
    uncovered: [],
  }
}
