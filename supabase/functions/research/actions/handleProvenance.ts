import { mayReadDiagnostics } from '../answer/mayReadDiagnostics.ts'
import type { Principal } from '../Principal.ts'
import { readRequestProvenance } from './readRequestProvenance.ts'
import { revisionCurrency } from './revisionCurrency.ts'

/**
 * Reopen one of the caller's own answers. The revision list is always returned;
 * the stored diagnostic record is gated exactly as it is on `ask`, so viewing
 * as a member withholds it here too.
 */
export async function handleProvenance(
  principal: Principal,
  requestId: string,
) {
  const record = await readRequestProvenance(principal, requestId)
  const diagnostics = record.diagnostics as { revisionIds?: string[] } | null
  const revisions = await revisionCurrency(
    principal,
    diagnostics?.revisionIds ?? [],
  )
  return {
    requestId: record.requestId,
    recordedAt: record.recordedAt,
    totalTokens: record.totalTokens,
    revisions,
    ...(mayReadDiagnostics(principal)
      ? { diagnostics: record.diagnostics }
      : {}),
  }
}
