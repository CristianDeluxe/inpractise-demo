import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { Principal } from '../Principal.ts'

export async function readCitationAttribution(
  principal: Principal,
  candidate: Candidate,
) {
  let passageQuery = principal.client
    .from('passages')
    .select(
      'speaker,speaker_role,document_revisions!inner(documents!inner(required_tier))',
    )
    .eq('org_id', candidate.orgId)
    .eq('document_id', candidate.documentId)
    .eq('revision_id', candidate.revisionId)
    .eq('passage_id', candidate.passageId)
  if (!principal.premium)
    passageQuery = passageQuery.eq(
      'document_revisions.documents.required_tier',
      'basic',
    )
  const passage = await passageQuery.maybeSingle()
  if (passage.error)
    throw new ApiError('dependency_failure', 'Evidence read failed', true)
  return passage
}
