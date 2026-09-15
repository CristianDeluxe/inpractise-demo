import type { Citation } from '@/api/Citation'
import { diagnosticsFixture } from './diagnosticsFixture'

export function askPayloadFixture(citation: Citation) {
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
}
