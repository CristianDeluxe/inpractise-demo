import type { Inspection } from '@/contracts/Inspection'
import type { RequestSummary } from './RequestSummary'

/**
 * One line per ledger row. A compare record carries two retrievals, so its
 * numbers are the sum of both sides; the expanded row still shows each side.
 */
export function summariseRequest(
  diagnostics: Inspection['recentRequests'][number]['diagnostics'],
): RequestSummary {
  if (diagnostics === null)
    return {
      kind: 'Unrecorded',
      ranked: null,
      selected: null,
      contextTokens: null,
    }
  if ('filings' in diagnostics)
    return {
      kind: 'Compare',
      ranked:
        diagnostics.interviews.candidateAt10.length +
        diagnostics.filings.candidateAt10.length,
      selected:
        diagnostics.interviews.selectedIds.length +
        diagnostics.filings.selectedIds.length,
      contextTokens:
        diagnostics.interviews.selectedTokens +
        diagnostics.filings.selectedTokens,
    }
  return {
    kind: 'Ask',
    ranked: diagnostics.candidateAt10.length,
    selected: diagnostics.selectedIds.length,
    contextTokens: diagnostics.selectedTokens,
  }
}
