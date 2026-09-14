import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import { readRecentRequests } from './readRecentRequests.ts'

/** Reviewer-only, and caller-scoped: the counts are what THIS reviewer may read. */
export async function handleDebug(principal: Principal) {
  if (principal.role !== 'reviewer' || !principal.premium)
    throw new ApiError('forbidden', 'Unrestricted reviewer access required')
  const result = await principal.client.rpc('inspect_corpus')
  if (result.error)
    throw new ApiError('dependency_failure', 'Corpus inspection failed', true)
  return {
    corpus: result.data,
    recentRequests: await readRecentRequests(principal),
  }
}
