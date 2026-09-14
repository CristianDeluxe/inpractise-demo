import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { Principal } from '../Principal.ts'
import type { CitationSource } from './CitationSource.ts'
import { readCitationAttribution } from './readCitationAttribution.ts'

/**
 * Reads the evidence metadata with the CALLER's client. A passage whose
 * authorisation changed between retrieval and this read simply disappears here,
 * which is why the answer path re-reads rather than trusting what it selected.
 */
export async function readCitationSources(
  principal: Principal,
  candidates: readonly Candidate[],
): Promise<CitationSource[]> {
  const sources: CitationSource[] = []
  for (const candidate of candidates) {
    let query = principal.client
      .from('document_revisions')
      .select(
        'title,company,origin,kind,interview_date,published_at,source_url,documents!inner(required_tier)',
      )
      .eq('org_id', candidate.orgId)
      .eq('document_id', candidate.documentId)
      .eq('revision_id', candidate.revisionId)
    if (!principal.premium) query = query.eq('documents.required_tier', 'basic')
    const revision = await query.maybeSingle()
    if (revision.error)
      throw new ApiError('dependency_failure', 'Evidence read failed', true)
    if (!revision.data) continue
    const passage = await readCitationAttribution(principal, candidate)
    if (!passage.data) continue
    sources.push({
      documentId: candidate.documentId,
      revisionId: candidate.revisionId,
      passageId: candidate.passageId,
      text: candidate.text,
      title: revision.data.title,
      company: revision.data.company,
      origin: revision.data.origin,
      kind: revision.data.kind,
      speaker: passage.data.speaker,
      speakerRole: passage.data.speaker_role,
      interviewDate: revision.data.interview_date,
      publishedAt: revision.data.published_at,
      sourceUrl: revision.data.source_url,
    })
  }
  return sources
}
