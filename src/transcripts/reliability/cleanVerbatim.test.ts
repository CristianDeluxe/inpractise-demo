import { describe, expect, it } from 'vitest'
import { cleanVerbatim } from './cleanVerbatim'

describe('cleanVerbatim', () => {
  it('drops fillers, moves a sentence capital and keeps a full stop', () => {
    const words = [
      'industry.',
      'Uh',
      'so',
      'in',
      'healthcare,',
      'uh.',
      'Fine',
      'um,',
      'good',
    ].map((text, start) => ({ text, score: 1, start }))
    expect(cleanVerbatim(words).map((word) => word.text)).toEqual([
      'industry.',
      'So',
      'in',
      'healthcare.',
      'Fine',
      'good',
    ])
  })
  it('reads a one-word stutter once and keeps legitimate doubles', () => {
    const words = [
      'It',
      'is',
      'much',
      'much,',
      'harder.',
      'What',
      'what',
      'that',
      'that',
      'means',
      'here.',
      'Here',
    ].map((text, start) => ({ text, score: start === 3 ? 0.5 : 1, start }))
    const clean = cleanVerbatim(words)
    expect(clean.map((word) => word.text)).toEqual([
      'It',
      'is',
      'much,',
      'harder.',
      'What',
      'that',
      'that',
      'means',
      'here.',
      'Here',
    ])
    expect(clean[2]).toEqual({ text: 'much,', score: 0.5, start: 2 })
  })
})
