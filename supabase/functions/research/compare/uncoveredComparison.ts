import type { CompareResult } from './CompareResult.ts'
import type { CompareScope } from './CompareScope.ts'
import type { CompareSide } from './CompareSide.ts'
import type { CompareSideName } from './CompareSideName.ts'
import { sideLabels } from './sideLabels.ts'
import type { SidesRetrieval } from './SidesRetrieval.ts'

/**
 * A cross-reference needs both accounts. When one side has no readable passage
 * the provider is not called: the result names the uncovered side, so a
 * fictional company with interviews and no filing is reported as exactly that,
 * not as a verdict that found nothing.
 */
export function uncoveredComparison(
  scope: CompareScope,
  sides: SidesRetrieval,
  uncovered: readonly CompareSideName[],
): CompareResult {
  const side = (name: CompareSideName): CompareSide => ({
    status: 'not_found',
    claims: [],
    missingEvidence: [
      uncovered.includes(name)
        ? `No ${sideLabels[name]} passage matched this topic for ${scope.company}.`
        : 'Nothing to cross-reference: the other side has no evidence.',
    ],
    citations: [],
    candidateCount: sides[name].candidates.length,
  })
  return {
    ...scope,
    sides: { interviews: side('interviews'), filings: side('filings') },
    relations: [],
    uncovered: [...uncovered],
  }
}
