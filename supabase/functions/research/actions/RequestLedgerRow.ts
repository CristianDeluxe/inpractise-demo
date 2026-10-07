import type { Json } from '../../_shared/types/Json.ts'

/** One request-ledger row as stored, before it is mapped to its API shape. */
export type RequestLedgerRow = {
  request_id: string
  recorded_at: string
  total_tokens: number | null
  diagnostics: Json | null
}
