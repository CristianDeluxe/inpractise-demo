import { citationFixture } from '@/api/citationFixture.ts'

export function backendDataFixture(action: string): Record<string, unknown> {
  const citation = citationFixture()
  switch (action) {
    case 'me':
      return { orgId: 'demo-org', role: 'member', premium: false }
    case 'read':
      return {
        citation,
        section: 'Synthetic evidence',
        isCurrentRevision: true,
        neighbourIds: ['p-2'],
      }
    case 'list':
      return {
        items: ['northstar', 'zenith'].map((id) => ({
          document_id: id,
          revision_id: 'rev-1',
          title: 'Synthetic interview',
          company: 'northstar',
          kind: 'synthetic_interview',
          origin: 'synthetic',
          interview_date: null,
          published_at: '2026-09-02T00:00:00Z',
          source_url: null,
        })),
      }
    case 'search':
      return { items: [citation], mode: 'lexical_only', truncated: false }
    case 'ask':
      return {
        status: 'answered',
        claims: [
          { text: 'Fixture claim.', citationIds: [citation.citationId] },
        ],
        missingEvidence: [],
        citations: [citation],
        mode: 'lexical_only',
        candidateCount: 1,
      }
    default:
      throw new Error('Unsupported fixture action')
  }
}
