import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import type { PassageRef } from './PassageRef.ts'

/** The revision carries the provenance every citation has to print. */
export async function readRevisionRow(principal: Principal, ref: PassageRef) {
  let query = principal.client
    .from('document_revisions')
    .select(
      'title,company,origin,kind,interview_date,published_at,source_url,is_current,documents!inner(required_tier)',
    )
    .eq('org_id', principal.orgId)
    .eq('document_id', ref.documentId)
    .eq('revision_id', ref.revisionId)
  if (!principal.premium) query = query.eq('documents.required_tier', 'basic')
  const revision = await query.maybeSingle()
  if (revision.error)
    throw new ApiError('dependency_failure', 'Revision read failed', true)
  if (!revision.data) throw new ApiError('not_found', 'No such revision')
  return revision.data
}
