import { citationFixture } from '@/api/citationFixture'
import { libraryPayloadFixture } from './libraryPayloadFixture'

export function uiPayloadFixture(action: string) {
  const citation = citationFixture()
  switch (action) {
    case 'me':
      return { orgId: 'demo-org', role: 'reviewer', premium: true }
    case 'list':
      return libraryPayloadFixture()
    case 'read':
      return {
        citation,
        section: 'Interview',
        isCurrentRevision: false,
        neighbourIds: ['P3'],
      }
    case 'search':
      return { items: [citation], mode: 'lexical_only', truncated: true }
    case 'ask':
      return {
        status: 'partial',
        claims: [
          {
            text: 'A supported claim with limits.',
            citationIds: [citation.citationId],
          },
        ],
        citations: [citation],
        missingEvidence: ['No February figures.'],
        mode: 'hybrid',
        candidateCount: 4,
      }
    case 'debug':
      return {
        corpus: {
          documents: 1,
          revisions: 2,
          passages: 4,
          vectors: 4,
          report: null,
          diagnosis: 'unclassified',
        },
      }
    default:
      throw new Error('Unexpected action')
  }
}
