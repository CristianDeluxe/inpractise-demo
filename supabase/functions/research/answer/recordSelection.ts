import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'
import { recordDiagnostics } from './recordDiagnostics.ts'
import type { RecordSelectionInput } from './RecordSelectionInput.ts'
import { retrievalDiagnostics } from './retrievalDiagnostics.ts'
import { selectedCandidates } from './selectedCandidates.ts'

/**
 * Narrows retrieval to what context selection kept, reads those passages
 * under the caller's own authorization, and records the retrieval diagnostics
 * for this request. The citation read overlaps a fresh embedding still being
 * offered to the cache rather than waiting on it first.
 */
export async function recordSelection(
  principal: Principal,
  input: RecordSelectionInput,
) {
  const selected = selectedCandidates(input.candidates, input.selectedIds)
  const [sources] = await Promise.all([
    readCitationSources(principal, selected),
    input.embeddingStored,
  ])
  const record = retrievalDiagnostics(input.candidates, selected)
  await recordDiagnostics(principal, input.request, record)
  return { selected, sources, record }
}
