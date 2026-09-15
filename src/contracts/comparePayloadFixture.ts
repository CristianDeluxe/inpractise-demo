import { citationFixture } from '@/api/citationFixture'
import type { ComparePayloadOptions } from './ComparePayloadOptions'
import { filingCitationFixture } from './filingCitationFixture'

/**
 * A grounded cross-reference as the server publishes it: one interview claim
 * quoting the interview fixture, one filing claim quoting the filing fixture,
 * and one relation between them. Options replace one piece at a time.
 */
export function comparePayloadFixture(options: ComparePayloadOptions = {}) {
  const interview = citationFixture()
  const filing = filingCitationFixture()
  return {
    company: interview.company,
    topic: 'deployment time',
    mode: 'hybrid',
    sides: {
      interviews: {
        status: 'answered',
        claims: [
          {
            claimId: 'i1',
            text: 'A small deployment took six weeks.',
            quote: 'Source evidence',
            citationIds: [interview.citationId],
            ...options.interviewClaim,
          },
        ],
        missingEvidence: [],
        citations: [interview],
        candidateCount: 3,
      },
      filings: {
        status: 'answered',
        claims: [
          {
            claimId: 'f1',
            text: 'Deployments completed within one quarter.',
            quote: 'within one quarter',
            citationIds: [filing.citationId],
          },
        ],
        missingEvidence: [],
        citations: [filing],
        candidateCount: 2,
        ...options.filingSide,
      },
    },
    relations: options.relations ?? [
      { interviewClaimId: 'i1', filingClaimId: 'f1', relation: 'agrees' },
    ],
    uncovered: options.uncovered ?? [],
    ...options.extra,
  }
}
