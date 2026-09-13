import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { ask } from './ask.ts'
import { citationFixture } from './citationFixture.ts'
import { clientFixture } from './clientFixture.ts'
import { extractProviderAnswer } from './extractProviderAnswer.ts'
import { me } from './me.ts'
import { successFixture } from './successFixture.ts'
import { validateCitation } from './validators/validateCitation.ts'

describe('six action adapters with explicitly test-only response layouts', () => {
  it('supports flat and nested ask fixtures without assuming a production wire layout', async () => {
    const nested = {
      testAnswer: {
        status: 'answered',
        claims: [
          {
            text: 'The source reports evidence.',
            citationIds: [citationFixture().citationId],
          },
        ],
        missingEvidence: [],
      },
      testEvidence: [citationFixture()],
    }
    const nestedParser = (input: unknown) =>
      z
        .strictObject({
          testAnswer: z.strictObject({
            status: z.literal('answered'),
            claims: z.array(
              z.strictObject({
                text: z.string(),
                citationIds: z.array(z.string()),
              }),
            ),
            missingEvidence: z.array(z.string()),
          }),
          testEvidence: z.array(z.unknown().transform(validateCitation)),
        })
        .parse(input)
    const response = await ask(
      clientFixture(async () => Promise.resolve(successFixture(nested, 'ask'))),
      { action: 'ask', query: 'Evidence?' },
      nestedParser,
    )
    expect(extractProviderAnswer(response.data).status).toBe('answered')
    const flatParser = (input: unknown) =>
      z
        .strictObject({
          status: z.literal('not_found'),
          claims: z.tuple([]),
          missingEvidence: z.array(z.string()),
        })
        .parse(input)
    const empty = await ask(
      clientFixture(async () =>
        Promise.resolve(
          successFixture(
            {
              status: 'not_found',
              claims: [],
              missingEvidence: ['Unsupported'],
            },
            'ask',
          ),
        ),
      ),
      { action: 'ask', query: 'Unknown?' },
      flatParser,
    )
    expect(extractProviderAnswer(empty.data)).toEqual({
      status: 'not_found',
      claims: [],
      missingEvidence: ['Unsupported'],
    })
  })
  it('rejects parser exceptions as typed protocol errors', async () => {
    await expect(
      me(
        clientFixture(async () =>
          Promise.resolve(successFixture({ unexpected: true })),
        ),
        { action: 'me' },
        (input) => z.strictObject({ testAccess: z.string() }).parse(input),
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
  it('validates malformed raw evidence before a parser could discard it', async () => {
    const parser = vi.fn(() => ({ testValue: 'clean' }))
    await expect(
      me(
        clientFixture(async () =>
          Promise.resolve(
            successFixture({ testEvidence: citationFixture({ quote: '' }) }),
          ),
        ),
        { action: 'me' },
        parser,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
    expect(parser).not.toHaveBeenCalled()
  })
})
