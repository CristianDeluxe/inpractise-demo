import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/**
 * Lists only current, authorised revisions. RLS does the filtering; this adds
 * an explicit overflow error rather than silently truncating the corpus.
 */
export async function handleList(
  principal: Principal,
  company: string | undefined,
  kind: string | undefined,
) {
  let query = principal.client
    .from('document_revisions')
    .select(
      'document_id,revision_id,title,company,kind,origin,interview_date,published_at,source_url',
    )
    .eq('is_current', true)
  if (company) query = query.eq('company', company)
  if (kind) query = query.eq('kind', kind)
  const result = await query.order('document_id').limit(51)
  if (result.error)
    throw new ApiError('dependency_failure', 'Library read failed', true)
  if (result.data.length > 50)
    throw new ApiError('invalid_request', 'Corpus larger than the demo bound')
  return { items: result.data }
}
