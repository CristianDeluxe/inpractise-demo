import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

export async function debitRequest(principal: Principal): Promise<string> {
  const { data, error } = await principal.client.rpc('debit_request', {})
  if (error?.message === 'allowance_exhausted')
    throw new ApiError('allowance_exhausted', 'Daily Ask allowance exhausted')
  if (error || !data)
    throw new ApiError('dependency_failure', 'Allowance unavailable', true)
  return data
}
