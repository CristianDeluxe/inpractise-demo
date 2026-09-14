import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/**
 * Ask must obtain this caller-scoped ledger ID before embedding or generation.
 * Exhaustion is distinct from an unavailable ledger; neither permits provider
 * work to proceed. Later failures do not refund the debit.
 */
export async function debitRequest(principal: Principal): Promise<string> {
  const { data, error } = await principal.client.rpc('debit_request', {})
  if (error?.message === 'allowance_exhausted')
    throw new ApiError('allowance_exhausted', 'Daily Ask allowance exhausted')
  if (error || !data)
    throw new ApiError('dependency_failure', 'Allowance unavailable', true)
  return data
}
