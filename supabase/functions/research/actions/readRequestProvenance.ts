import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import { toRequestRecord } from './toRequestRecord.ts'

/**
 * One ledger row by id. Row level security already scopes request_usage to the
 * authenticated principal, so another caller's request is simply absent: the
 * not_found here is an authorization outcome expressed as a missing row, which
 * is the behaviour we want to keep.
 */
export async function readRequestProvenance(
  principal: Principal,
  requestId: string,
) {
  const result = await principal.client
    .from('request_usage')
    .select('request_id,recorded_at,total_tokens,diagnostics')
    .eq('request_id', requestId)
    .maybeSingle()
  if (result.error)
    throw new ApiError('dependency_failure', 'Request lookup failed', true)
  if (!result.data) throw new ApiError('not_found', 'No such request')
  return toRequestRecord(result.data)
}
