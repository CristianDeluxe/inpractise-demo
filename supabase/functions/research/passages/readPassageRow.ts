import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import type { PassageRef } from './PassageRef.ts'

/** An unauthorised passage is a plain 404: no title hint, no enumeration. */
export async function readPassageRow(principal: Principal, ref: PassageRef) {
  let query = principal.client
    .from('passages')
    .select(
      'text_content,ordinal,section,speaker,speaker_role,document_revisions!inner(documents!inner(required_tier))',
    )
    .eq('org_id', principal.orgId)
    .eq('document_id', ref.documentId)
    .eq('revision_id', ref.revisionId)
    .eq('passage_id', ref.passageId)
  if (!principal.premium)
    query = query.eq('document_revisions.documents.required_tier', 'basic')
  const passage = await query.maybeSingle()
  if (passage.error)
    throw new ApiError('dependency_failure', 'Passage read failed', true)
  if (!passage.data) throw new ApiError('not_found', 'No such passage')
  return passage.data
}
