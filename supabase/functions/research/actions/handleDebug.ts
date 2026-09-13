import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/** Reviewer-only, and caller-scoped: the counts are what THIS reviewer may read. */
export async function handleDebug(principal: Principal) {
  if (principal.role !== 'reviewer')
    throw new ApiError('forbidden', 'Reviewer role required')
  const result = await principal.client.rpc('inspect_corpus')
  if (result.error)
    throw new ApiError('dependency_failure', 'Corpus inspection failed', true)
  return { corpus: result.data }
}
