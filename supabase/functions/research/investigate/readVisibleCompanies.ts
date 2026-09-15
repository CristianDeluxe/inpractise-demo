import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/**
 * The company slugs the caller may scope a sub-question to: those with a
 * current revision they are allowed to read. Read under the caller's client,
 * so a plan can never name a company the caller cannot list.
 */
export async function readVisibleCompanies(
  principal: Principal,
): Promise<string[]> {
  let query = principal.client
    .from('document_revisions')
    .select('company,documents!inner(required_tier)')
    .eq('is_current', true)
  if (!principal.premium) query = query.eq('documents.required_tier', 'basic')
  const result = await query.limit(200)
  if (result.error)
    throw new ApiError('dependency_failure', 'Company read failed', true)
  return [...new Set(result.data.map((row) => row.company))].sort()
}
