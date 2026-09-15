import { compareContentFixture } from './compareContentFixture.ts'

/** Replies the grounding check must reject as invalid model answers. */
export const invalidComparisonCases = [
  { name: 'malformed JSON', content: '{' },
  {
    name: 'quotation that is not a substring of the cited passage',
    content: compareContentFixture({
      interviews: {
        status: 'answered',
        claims: [
          {
            text: 'Paraphrased.',
            quote: 'moved in about six weeks',
            sources: [1],
          },
        ],
        missingEvidence: [],
      },
    }),
  },
  {
    name: 'interview claim citing a filing passage',
    content: compareContentFixture({
      interviews: {
        status: 'answered',
        claims: [
          {
            text: 'Crossed.',
            quote: 'completed within one quarter',
            sources: [2],
          },
        ],
        missingEvidence: [],
      },
    }),
  },
  {
    name: 'filing claim citing a label that was never supplied',
    content: compareContentFixture({
      filings: {
        status: 'answered',
        claims: [
          {
            text: 'Invented.',
            quote: 'completed within one quarter',
            sources: [3],
          },
        ],
        missingEvidence: [],
      },
    }),
  },
  {
    name: 'relation naming a claim that was not made',
    content: compareContentFixture({
      relations: [{ interviewClaim: 1, filingClaim: 2, relation: 'extends' }],
    }),
  },
  {
    name: 'not_found side carrying claims',
    content: compareContentFixture({
      filings: {
        status: 'not_found',
        claims: [
          {
            text: 'Refused.',
            quote: 'completed within one quarter',
            sources: [2],
          },
        ],
        missingEvidence: [],
      },
    }),
  },
  {
    name: 'answered side without claims',
    content: compareContentFixture({
      filings: { status: 'answered', claims: [], missingEvidence: [] },
    }),
  },
  {
    name: 'unknown relation',
    content: compareContentFixture({
      relations: [{ interviewClaim: 1, filingClaim: 1, relation: 'disputes' }],
    }),
  },
]
