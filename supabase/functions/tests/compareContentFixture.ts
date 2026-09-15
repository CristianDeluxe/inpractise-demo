/**
 * A well-formed cross-reference from the provider: one interview claim citing
 * label 1, one filing claim citing label 2, and one relation between them.
 * Every quotation is a substring of the fixture passage it cites.
 */
export function compareContentFixture(
  overrides: Record<string, unknown> = {},
): string {
  return JSON.stringify({
    interviews: {
      status: 'answered',
      claims: [
        {
          text: 'A small deployment took six weeks.',
          quote: 'moved in six weeks',
          sources: [1],
        },
      ],
      missingEvidence: [],
    },
    filings: {
      status: 'answered',
      claims: [
        {
          text: 'Smaller deployments completed within a quarter.',
          quote: 'completed within one quarter',
          sources: [2],
        },
      ],
      missingEvidence: [],
    },
    relations: [{ interviewClaim: 1, filingClaim: 1, relation: 'agrees' }],
    ...overrides,
  })
}
