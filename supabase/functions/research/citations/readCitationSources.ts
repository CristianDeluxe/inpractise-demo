import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { Principal } from '../Principal.ts'
import type { CitationSource } from './CitationSource.ts'

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
    const revision = await principal.client
      .from('document_revisions')
      .select(
        'title,company,origin,kind,interview_date,published_at,source_url',
      )
      .eq('org_id', candidate.orgId)
      .eq('document_id', candidate.documentId)
      .eq('revision_id', candidate.revisionId)
      .maybeSingle()
    if (revision.error)
      throw new ApiError('dependency_failure', 'Evidence read failed', true)
    if (!revision.data) continue
    const passage = await principal.client
      .from('passages')
      .select('speaker,speaker_role')
      .eq('org_id', candidate.orgId)
      .eq('document_id', candidate.documentId)
      .eq('revision_id', candidate.revisionId)
      .eq('passage_id', candidate.passageId)
      .maybeSingle()
    if (passage.error)
      throw new ApiError('dependency_failure', 'Evidence read failed', true)
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
