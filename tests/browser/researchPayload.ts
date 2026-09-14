import { passageFixture } from './passageFixture.ts'

/**
 * The offline stand-in for the research service. It answers by action only, so
 * the workflow test exercises the client, the router and the rendering path
 * without a network, a database or a provider.
 */
export function researchPayload(action: string) {
  const citation = passageFixture()
  switch (action) {
    case 'me':
      return { orgId: 'org-a', role: 'reviewer', premium: true }
    case 'list':
      return {
        items: [
          {
            document_id: citation.documentId,
            revision_id: citation.revisionId,
            title: citation.title,
            company: citation.company,
            kind: citation.kind,
            origin: citation.origin,
            interview_date: citation.interviewDate,
            published_at: citation.publishedAt,
            source_url: null,
            passage_count: 4,
          },
        ],
      }
    case 'search':
      return { items: [citation], mode: 'lexical_only', truncated: false }
    case 'ask':
      return {
        status: 'partial',
        claims: [
          {
            text: 'Complex installations are hard to migrate because integrations must be rebuilt.',
            citationIds: [citation.citationId],
          },
        ],
        citations: [citation],
        missingEvidence: ['No enterprise switching cost was measured.'],
        mode: 'lexical_only',
        candidateCount: 6,
      }
    case 'read':
      return {
        citation,
        section: 'Interview',
        isCurrentRevision: true,
        neighbourIds: ['P3'],
      }
    default:
      throw new Error(`Unstubbed action: ${action}`)
  }
}
