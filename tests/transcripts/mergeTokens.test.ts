import { describe, expect, it } from 'vitest'
import { mergeTokens } from '../../scripts/transcripts/mergeTokens.ts'
import { tokenFixture } from './tokenFixture.ts'

describe('token to word merge', () => {
  it('joins sub-word tokens until a token starts with a space', () => {
    const words = mergeTokens([
      tokenFixture(' Gen', 0, 0.99),
      tokenFixture('en', 0.1, 0.99),
      tokenFixture('tech', 0.2, 0.99),
      tokenFixture(' rose', 0.3, 0.99),
    ])
    expect(words.map((word) => word.text)).toEqual(['Genentech', 'rose'])
  })

  it('takes the minimum token confidence and the span of the first to last token', () => {
    const [word] = mergeTokens([
      tokenFixture(' Gen', 1, 0.99),
      tokenFixture('en', 1.1, 0.7),
      tokenFixture('tech', 1.2, 0.95),
    ])
    expect(word?.confidence).toBe(0.7)
    expect(word?.start).toBe(1)
    expect(word?.end).toBeCloseTo(1.3)
  })

  it('marks only the first word of the sentence and strips the leading space', () => {
    const words = mergeTokens([
      tokenFixture(' Hello', 0, 1),
      tokenFixture(' there', 0.2, 1),
    ])
    expect(words.map((word) => word.sentenceStart)).toEqual([true, false])
    expect(words[0]?.text).toBe('Hello')
  })

  it('starts a word on the first token even without a leading space', () => {
    expect(mergeTokens([tokenFixture('Yes', 0, 1)])).toHaveLength(1)
  })

  it('ignores blank tokens', () => {
    expect(
      mergeTokens([tokenFixture(' ', 0, 1), tokenFixture(' ok', 0.1, 1)]),
    ).toHaveLength(1)
  })
})
