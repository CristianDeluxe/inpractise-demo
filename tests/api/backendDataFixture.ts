import { podcastCitationFixture } from './podcastCitationFixture.ts'
import { podcastDocumentsFixture } from './podcastDocumentsFixture.ts'

export function backendDataFixture(action: string): Record<string, unknown> {
  const citation = podcastCitationFixture()
  switch (action) {
    case 'me':
      return { orgId: 'demo-org', role: 'member', premium: false }
    case 'read':
      return {
        citation,
        section: 'Interview',
        isCurrentRevision: true,
        neighbourIds: ['p-2'],
      }
    case 'list':
      return {
        items: podcastDocumentsFixture(),
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
