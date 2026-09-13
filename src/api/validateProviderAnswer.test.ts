import { describe, expect, it } from 'vitest'
import { validateProviderAnswer } from './validators/validateProviderAnswer.ts'

describe('provider answer boundary', () => {
  it('not_found is a successful answer, with no claims', () => {
    expect(
      validateProviderAnswer(
        { status: 'not_found', claims: [], missingEvidence: ['No support'] },
        new Set(),
      ),
    ).toEqual({
      status: 'not_found',
      claims: [],
      missingEvidence: ['No support'],
    })
  })
  it.each(['answered', 'partial', 'conflict'])(
    'accepts supported %s',
    (status) => {
      expect(
        validateProviderAnswer(
          {
            status,
            claims: [
              {
                text: 'The source reports evidence.',
                citationIds: ['doc:rev:p'],
              },
            ],
            missingEvidence: [],
          },
          new Set(['doc:rev:p']),
        ).status,
      ).toBe(status)
    },
  )
  it.each([
    { status: 'answered', claims: [], missingEvidence: [] },
    {
      status: 'not_found',
      claims: [{ text: 'Unsupported', citationIds: ['doc:rev:p'] }],
      missingEvidence: [],
    },
    {
      status: 'answered',
      claims: [{ text: 'Invented', citationIds: ['unknown'] }],
      missingEvidence: [],
    },
    {
      status: 'answered',
      claims: [{ text: 'No citation', citationIds: [] }],
      missingEvidence: [],
    },
    {
      status: 'answered',
      claims: [{ text: 'x'.repeat(501), citationIds: ['doc:rev:p'] }],
      missingEvidence: [],
    },
    {
      status: 'answered',
      claims: Array.from({ length: 5 }, () => ({
        text: 'Claim',
        citationIds: ['doc:rev:p'],
      })),
      missingEvidence: [],
    },
    { status: 'not_found', claims: [] },
    {
      status: 'not_found',
      claims: [],
      missingEvidence: [],
      markdown: 'invented',
    },
  ])('rejects invalid answers %j', (answer) => {
    expect(() =>
      validateProviderAnswer(answer, new Set(['doc:rev:p'])),
    ).toThrow(expect.objectContaining({ code: 'protocol' }))
  })
})
