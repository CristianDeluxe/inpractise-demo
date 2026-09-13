import { describe, expect, expectTypeOf, it } from 'vitest'
import { z } from 'zod'
import { requireValue } from '../../tests/assertions/requireValue.ts'
import { citationFixture } from './citationFixture.ts'
import { clientFixture } from './clientFixture.ts'
import { search } from './search.ts'
import { successFixture } from './successFixture.ts'
import { validateCitation } from './validators/validateCitation.ts'

describe('caller-defined search item layouts', () => {
  it('accepts wrapped citation items and preserves inferred item fields', async () => {
    const parser = (input: unknown) =>
      z
        .strictObject({
          items: z.array(
            z.strictObject({
              testEvidence: z.unknown().transform(validateCitation),
              testRank: z.number(),
            }),
          ),
          mode: z.enum(['hybrid', 'lexical_only']),
          truncated: z.boolean(),
          testFingerprint: z.string(),
        })
        .parse(input)
    const response = await search(
      clientFixture(async () =>
        Promise.resolve(
          successFixture(
            {
              items: [{ testEvidence: citationFixture(), testRank: 1 }],
              mode: 'hybrid',
              truncated: false,
              testFingerprint: 'test',
            },
            'search',
          ),
        ),
      ),
      { action: 'search', query: 'Evidence' },
      parser,
    )
    expect(response.data.items[0]?.testEvidence.citationId).toBe(
      citationFixture().citationId,
    )
    expectTypeOf(
      requireValue(response.data.items[0]).testRank,
    ).toEqualTypeOf<number>()
  })

  it('accepts citation fields with parser-approved ranking metadata', async () => {
    const parser = (input: unknown) =>
      z
        .strictObject({
          items: z.array(
            z.record(z.string(), z.unknown()).transform((item) => {
              const { testRank, ...citation } = item
              return {
                ...validateCitation(citation),
                testRank: z.number().parse(testRank),
              }
            }),
          ),
          mode: z.enum(['hybrid', 'lexical_only']),
          truncated: z.boolean(),
        })
        .parse(input)
    const response = await search(
      clientFixture(async () =>
        Promise.resolve(
          successFixture(
            {
              items: [{ ...citationFixture(), testRank: 0.5 }],
              mode: 'hybrid',
              truncated: false,
            },
            'search',
          ),
        ),
      ),
      { action: 'search', query: 'Evidence' },
      parser,
    )
    expect(response.data.items[0]?.testRank).toBe(0.5)
    expect(response.data.items[0]?.quote).toBe(citationFixture().quote)
  })

  it('rejects malformed quotes nested inside an item', async () => {
    const parser = (input: unknown) =>
      z
        .strictObject({
          items: z.array(
            z.strictObject({
              testEvidence: z.unknown().transform(validateCitation),
            }),
          ),
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
                items: [{ testEvidence: citationFixture({ quote: '' }) }],
                mode: 'hybrid',
                truncated: false,
              },
              'search',
            ),
          ),
        ),
        { action: 'search', query: 'Evidence' },
        parser,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })

  it('does not let unrelated evidence validate an empty search item', async () => {
    const parser = (input: unknown) =>
      z
        .strictObject({
          items: z.array(z.strictObject({})),
          testUnrelatedEvidence: z.unknown().transform(validateCitation),
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
                items: [{}],
                testUnrelatedEvidence: citationFixture(),
                mode: 'hybrid',
                truncated: false,
              },
              'search',
            ),
          ),
        ),
        { action: 'search', query: 'Evidence' },
        parser,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })

  it('retains strict standalone citation validation', () => {
    expect(() =>
      validateCitation({ ...citationFixture(), testRank: 1 }),
    ).toThrow(expect.objectContaining({ code: 'protocol' }))
  })
})
