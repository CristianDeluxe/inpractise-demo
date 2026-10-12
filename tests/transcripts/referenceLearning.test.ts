import { describe, expect, it } from 'vitest'
import { referenceSelection } from '../../scripts/transcripts/referenceSelection.ts'
import { reviewEditFixture } from './reviewEditFixture.ts'

describe('reference-confirmed learning', () => {
  const edit = (id: string) => ({
    ...reviewEditFixture(id, 'Zorbex', 'Zorbecks'),
    verdict: 'pending' as const,
  })
  const edits = [edit('p1-e1'), edit('p1-e2'), edit('p2-e1'), edit('p3-e1')]
  const verdicts = new Map([
    ['p1-e1', 'confirmed'],
    ['p2-e1', 'contested'],
    ['p3-e1', 'contradicted'],
  ] as const)

  it('learns glossary entries only from confirmed edits, as references', () => {
    const selection = referenceSelection(edits, verdicts)
    expect(selection.glossary.map((item) => item.id)).toEqual(['p1-e1'])
    expect(selection.basis).toBe('references')
  })

  it('counts style-only edits towards examples but never contested ones', () => {
    const selection = referenceSelection(edits, verdicts)
    expect(selection.examples.map((item) => item.id)).toEqual([
      'p1-e1',
      'p1-e2',
    ])
  })
})
