import { describe, expect, it } from 'vitest'
import { alignWords } from '../../scripts/transcripts/alignWords.ts'
import { wordErrorRate } from '../../scripts/transcripts/wordErrorRate.ts'
import { alignText } from './alignText.ts'

describe('pair alignment', () => {
  it('finds a substitution and ignores case and punctuation', () => {
    expect(alignText('the Zorbex, grew', 'The Zorbecks grew.')).toEqual([
      { from: 'Zorbex,', to: 'Zorbecks' },
    ])
  })

  it('finds insert-only and delete-only hunks', () => {
    expect(alignText('a c', 'a b c')).toEqual([{ from: '', to: 'b' }])
    expect(alignText('a b c', 'a c')).toEqual([{ from: 'b', to: '' }])
  })

  it('handles empty inputs', () => {
    expect(alignText('', '')).toEqual([])
    expect(alignText('', 'a b')).toEqual([{ from: '', to: 'a b' }])
    expect(alignText('a b', '')).toEqual([{ from: 'a b', to: '' }])
  })

  it('returns nothing for identical text and handles completely different text', () => {
    expect(alignText('a b c', 'a b c')).toEqual([])
    expect(alignText('a b', 'x y z')).toEqual([{ from: 'a b', to: 'x y z' }])
  })

  it('separates hunks by matching words and aligns long inputs quickly', () => {
    expect(alignText('a x b y c', 'a p b q c')).toEqual([
      { from: 'x', to: 'p' },
      { from: 'y', to: 'q' },
    ])
    const raw = Array.from({ length: 9000 }, (_, i) => `w${String(i)}`)
    const final = raw.map((word, i) => (i % 500 === 0 ? `${word}x` : word))
    expect(alignWords(raw, final)).toHaveLength(18)
  })

  it('computes word error rate against the final word count', () => {
    expect(wordErrorRate([], 10)).toBe(0)
    expect(wordErrorRate([{ from: 'a', to: 'b c' }], 10)).toBeCloseTo(0.2)
    expect(wordErrorRate([{ from: 'a b', to: '' }], 4)).toBeCloseTo(0.5)
    expect(wordErrorRate([{ from: 'a', to: 'b' }], 0)).toBe(0)
  })
})
