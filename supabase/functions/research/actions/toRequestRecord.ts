import type { RequestLedgerRow } from './RequestLedgerRow.ts'

/**
 * The ledger stores the diagnostic record as opaque JSON. It is returned as it
 * was written, without re-validation: the only writer is this service, and a
 * row whose shape the UI cannot read is more useful visible than silently
 * dropped.
 */
export function toRequestRecord(row: RequestLedgerRow) {
  return {
    requestId: row.request_id,
    recordedAt: row.recorded_at,
    totalTokens: row.total_tokens,
    diagnostics: row.diagnostics,
  }
}
