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
    resolvedQuery: 'How is Roche using AI in research and development?',
    diagnostics: diagnosticsFixture,
  }
}
