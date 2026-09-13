import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { citationFixture } from './citationFixture.ts'
import { clientFixture } from './clientFixture.ts'
import { debug } from './debug.ts'
import { list } from './list.ts'
import { me } from './me.ts'
import { read } from './read.ts'
import { search } from './search.ts'
import { successFixture } from './successFixture.ts'
import { validateCitation } from './validators/validateCitation.ts'

describe('six action adapters with explicitly test-only response layouts', () => {
  it('runs me, list and debug through required runtime parsers', async () => {
    // testValue is a test fixture property, not a proposed production contract.
    const parse = (input: unknown) =>
      z.strictObject({ testValue: z.string() }).parse(input)
    await expect(
      me(
        clientFixture(async () =>
          Promise.resolve(successFixture({ testValue: 'access' }, 'me')),
        ),
        { action: 'me' },
        parse,
      ),
    ).resolves.toMatchObject({ action: 'me', data: { testValue: 'access' } })
    await expect(
      list(
        clientFixture(async () =>
          Promise.resolve(successFixture({ testValue: 'documents' }, 'list')),
        ),
        { action: 'list', company: 'northstar', kind: 'synthetic_interview' },
        parse,
      ),
    ).resolves.toMatchObject({ action: 'list' })
    await expect(
      debug(
        clientFixture(async () =>
          Promise.resolve(successFixture({ testValue: 'report' }, 'debug')),
        ),
        { action: 'debug' },
        parse,
      ),
    ).resolves.toMatchObject({ action: 'debug' })
  })
  it('retains search mode, empty items, truncation and a test-only fingerprint key', async () => {
    const parse = (input: unknown) =>
      z
        .strictObject({
          items: z.array(z.unknown().transform(validateCitation)),
          mode: z.enum(['hybrid', 'lexical_only']),
          truncated: z.boolean(),
          testFingerprint: z.string(),
        })
        .parse(input)
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockImplementation(async () =>
        Promise.resolve(
          successFixture(
            {
              items: [],
              mode: 'lexical_only',
              truncated: false,
              testFingerprint: 'test-corpus',
            },
            'search',
          ),
        ),
      )
    const response = await search(
      clientFixture(fetch),
      { action: 'search', query: 'Unknown' },
      parse,
    )
    expect(response.data).toEqual({
      items: [],
      mode: 'lexical_only',
      truncated: false,
      testFingerprint: 'test-corpus',
    })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: '{"action":"search","query":"Unknown"}',
      }),
    )
  })
  it('reads exactly the requested passage using a test-only outer layout', async () => {
    const parse = (input: unknown) =>
      z
        .strictObject({ testPassage: z.unknown().transform(validateCitation) })
        .parse(input)
    await expect(
      read(
        clientFixture(async () =>
          Promise.resolve(
            successFixture({ testPassage: citationFixture() }, 'read'),
          ),
        ),
        {
          action: 'read',
          documentId: 'northstar',
          revisionId: 'rev-1',
          passageId: 'p-1',
        },
        parse,
      ),
    ).resolves.toMatchObject({ data: { testPassage: { passageId: 'p-1' } } })
    await expect(
      read(
        clientFixture(async () =>
          Promise.resolve(
            successFixture({ testPassage: citationFixture() }, 'read'),
          ),
        ),
        {
          action: 'read',
          documentId: 'northstar',
          revisionId: 'rev-1',
          passageId: 'p-2',
        },
        parse,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
})
