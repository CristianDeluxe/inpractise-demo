import { describe, expect, it } from 'vitest'
import { splitParagraphs } from '../../scripts/transcripts/splitParagraphs.ts'
import { sentenceWordsFixture } from './sentenceWordsFixture.ts'

describe('paragraph split', () => {
  it('keeps sentences with short gaps in one paragraph', () => {
    const words = [
      ...sentenceWordsFixture(3, 0),
      ...sentenceWordsFixture(3, 0.8),
    ]
    expect(splitParagraphs(words)).toEqual([{ from: 0, to: 6 }])
  })

  it('starts a new paragraph when the gap exceeds 1.2 seconds', () => {
    const words = [...sentenceWordsFixture(3, 0), ...sentenceWordsFixture(3, 2)]
    expect(splitParagraphs(words)).toEqual([
      { from: 0, to: 3 },
      { from: 3, to: 6 },
    ])
  })

  it('breaks at the next sentence once a paragraph exceeds 120 words', () => {
    const words = [
      ...sentenceWordsFixture(121, 0),
      ...sentenceWordsFixture(5, 13),
    ]
    expect(splitParagraphs(words)).toEqual([
      { from: 0, to: 121 },
      { from: 121, to: 126 },
    ])
  })

  it('never breaks inside a sentence', () => {
    const words = sentenceWordsFixture(200, 0)
    expect(splitParagraphs(words)).toEqual([{ from: 0, to: 200 }])
  })

  it('returns nothing for no words', () => {
    expect(splitParagraphs([])).toEqual([])
  })
})
