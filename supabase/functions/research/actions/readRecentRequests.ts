import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import { toRequestRecord } from './toRequestRecord.ts'

/**
 * The caller's own ledger rows, newest first. Row level security already scopes
 * request_usage to the authenticated principal, so this needs no filter of its
 * own: a query that returned another reviewer's requests would be a policy
 * failure, not a missing predicate here.
 */
export async function readRecentRequests(principal: Principal, limit = 10) {
  const result = await principal.client
    .from('request_usage')
    .select('request_id,recorded_at,total_tokens,diagnostics')
    .order('recorded_at', { ascending: false })
    .limit(limit)
  if (result.error)
    throw new ApiError('dependency_failure', 'Request history failed', true)
  return result.data.map(toRequestRecord)
}
