import { describe, expect, it } from 'vitest'
import { ApiError } from './ApiError.ts'
import { citationFixture } from './citationFixture.ts'
import { validateCitation } from './validators/validateCitation.ts'

describe('immutable citation boundary', () => {
  it('accepts full Unicode codepoint offsets', () => {
    expect(validateCitation(citationFixture()).endChar).toBe(17)
  })
  it.each([
    { quote: '' },
    { quote: ' ' },
    { citationId: 'another:rev-1:p-1' },
    { startChar: 1 },
    { endChar: 18 },
    { readerPath: 'https://evil.example/read/northstar/rev-1/p-1' },
    { readerPath: '//evil.example/read/northstar/rev-1/p-1' },
    { readerPath: '/read/northstar/rev-1/another' },
    { readerPath: '/read/northstar/rev-1/p-1?source=evil' },
    { readerPath: '/read/northstar/rev-1/p-1#source' },
    { readerPath: '/read/northstar/rev-1/../p-1' },
    {
      documentId: '..',
      citationId: '..:rev-1:p-1',
      readerPath: '/read/../rev-1/p-1',
    },
  ])('rejects unsafe or inconsistent evidence %j', (changes) => {
    expect(() => validateCitation(citationFixture(changes))).toThrow(ApiError)
    expect(() => validateCitation(citationFixture(changes))).toThrow(
      expect.objectContaining({ code: 'protocol' }),
    )
  })
  it('requires all nullable metadata properties to be present', () => {
    const { speaker: _speaker, ...citation } = citationFixture()
    expect(() => validateCitation(citation)).toThrow(
      expect.objectContaining({ code: 'protocol' }),
    )
  })
  it('rejects extra fields and accepts correctly encoded identifiers', () => {
    expect(() =>
      validateCitation({ ...citationFixture(), html: 'unsafe' }),
    ).toThrow(ApiError)
    expect(
      validateCitation(
        citationFixture({
          passageId: 'part/one',
          citationId: 'northstar:rev-1:part/one',
          readerPath: '/read/northstar/rev-1/part%2Fone',
        }),
      ).passageId,
    ).toBe('part/one')
  })
})
