import { citationFixture } from '@/api/citationFixture'
import { investigationFixture } from '@/contracts/investigationFixture'
import { debugPayloadFixture } from './debugPayloadFixture'
import { diagnosticsFixture } from './diagnosticsFixture'
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
        resolvedQuery:
          'What makes complex Northstar installations hard to replace?',
        diagnostics: diagnosticsFixture,
      }
    case 'investigate':
      return investigationFixture()
    case 'debug':
      return debugPayloadFixture()
    default:
      throw new Error('Unexpected action')
  }
}
