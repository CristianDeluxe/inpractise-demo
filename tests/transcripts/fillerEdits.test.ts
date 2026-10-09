import { describe, expect, it } from 'vitest'
import { paragraphFillerEdits } from '../../scripts/transcripts/paragraphFillerEdits.ts'
import { fillerChanges } from './fillerChanges.ts'

describe('paragraphFillerEdits', () => {
  it('drops a filler and capitalises the next word when it opened a sentence', () => {
    expect(fillerChanges('It is. Uh So I think')).toEqual([
      ['Uh So', 'So', [7]],
    ])
  })

  it('drops consecutive fillers inside a sentence', () => {
    expect(fillerChanges('saved uh uh millions of people')).toEqual([
      ['uh uh millions', 'millions', [6]],
    ])
  })

  it('folds a sentence-ending filler into the previous word', () => {
    expect(fillerChanges('in healthcare, uh.')).toEqual([
      ['healthcare, uh.', 'healthcare.', [3]],
    ])
  })

  it('leaves a filler inside text another edit already rewrites', () => {
    const existing = [
      {
        id: 'e',
        paragraphId: 'p1',
        from: 'uh healthcare',
        to: 'health care',
        category: 'term' as const,
        origin: 'model' as const,
        reason: '',
        confidence: 0.9,
      },
    ]
    expect(
      paragraphFillerEdits('p1', 'in uh healthcare'.split(' '), existing),
    ).toEqual([])
  })
})
