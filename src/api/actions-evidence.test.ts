import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { ask } from './ask.ts'
import { citationFixture } from './citationFixture.ts'
import { clientFixture } from './clientFixture.ts'
import { debug } from './debug.ts'
import { extractProviderAnswer } from './extractProviderAnswer.ts'
import { me } from './me.ts'
import { search } from './search.ts'
import { successFixture } from './successFixture.ts'
import { validateCitation } from './validators/validateCitation.ts'

describe('six action adapters with explicitly test-only response layouts', () => {
  it('validates parser output and forbids fabricated or modified citation evidence', async () => {
    const client = clientFixture(async () =>
      Promise.resolve(successFixture({ testEvidence: citationFixture() })),
    )
    await expect(
      me(client, { action: 'me' }, () => ({
        testEvidence: citationFixture({ readerPath: '//evil.example' }),
      })),
    ).rejects.toMatchObject({ code: 'protocol' })
    await expect(
      me(client, { action: 'me' }, () => ({
        testEvidence: citationFixture({
          quote: 'Altered evidence!',
          endChar: 17,
        }),
      })),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
  it('rejects answer citation membership failures and conflicting duplicate evidence', async () => {
    const bad = {
      status: 'answered',
      claims: [{ text: 'Claim', citationIds: ['unknown'] }],
      missingEvidence: [],
      testEvidence: [citationFixture()],
    }
    await expect(
      ask(
        clientFixture(async () => Promise.resolve(successFixture(bad, 'ask'))),
        { action: 'ask', query: 'Question' },
        (input) => z.record(z.string(), z.unknown()).parse(input),
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
    const duplicated = {
      testEvidence: [citationFixture(), citationFixture({ title: 'Changed' })],
    }
    await expect(
      me(
        clientFixture(async () => Promise.resolve(successFixture(duplicated))),
        { action: 'me' },
        (input) => z.record(z.string(), z.unknown()).parse(input),
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
  it('rejects nonobject or incomplete action data and enforces search item bounds', async () => {
    await expect(
      me(
        clientFixture(async () => Promise.resolve(successFixture(null))),
        { action: 'me' },
        () => ({}),
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
    await expect(
      ask(
        clientFixture(async () => Promise.resolve(successFixture({}, 'ask'))),
        { action: 'ask', query: 'Question' },
        () => ({}),
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
    const parse = (input: unknown) =>
      z
        .strictObject({
          items: z.array(z.unknown().transform(validateCitation)),
          mode: z.enum(['hybrid', 'lexical_only']),
          truncated: z.boolean(),
        })
        .parse(input)
    await expect(
      search(
        clientFixture(async () =>
          Promise.resolve(
            successFixture(
              {
                items: Array.from({ length: 11 }, () => citationFixture()),
                mode: 'hybrid',
                truncated: true,
              },
              'search',
            ),
          ),
        ),
        { action: 'search', query: 'Question' },
        parse,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
  it('does not mistake nested ask diagnostic statuses for structured answers', async () => {
    const fixture = {
      testAnswer: { status: 'not_found', claims: [], missingEvidence: [] },
      testDiagnostic: { status: 'partial' },
    }
    const parser = (input: unknown) =>
      z
        .strictObject({
          testAnswer: z.strictObject({
            status: z.literal('not_found'),
            claims: z.tuple([]),
            missingEvidence: z.array(z.string()),
          }),
          testDiagnostic: z.strictObject({ status: z.string() }),
        })
        .parse(input)
    const response = await ask(
      clientFixture(async () =>
        Promise.resolve(successFixture(fixture, 'ask')),
      ),
      { action: 'ask', query: 'Question' },
      parser,
    )
    expect(extractProviderAnswer(response.data).status).toBe('not_found')
  })
  it('does not mistake a debug report status for an answer', async () => {
    await expect(
      debug(
        clientFixture(async () =>
          Promise.resolve(
            successFixture({ testReport: { status: 'not_found' } }, 'debug'),
          ),
        ),
        { action: 'debug' },
        (input) =>
          z
            .strictObject({
              testReport: z.strictObject({ status: z.string() }),
            })
            .parse(input),
      ),
    ).resolves.toMatchObject({ data: { testReport: { status: 'not_found' } } })
  })
})
