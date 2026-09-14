import type { Json } from '../../_shared/types/Json.ts'
import type { Principal } from '../Principal.ts'

/**
 * Best effort by design: the answer is already correct without its diagnostic
 * record, so a ledger write that fails must not turn a good answer into an
 * error. The failure is visible as a request whose diagnostics stay null.
 */
export async function recordDiagnostics(
  principal: Principal,
  request: string,
  payload: Json,
): Promise<void> {
  await principal.client.rpc('record_request_diagnostics', {
    request,
    payload,
  })
}
