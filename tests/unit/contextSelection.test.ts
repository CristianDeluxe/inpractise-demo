import { describe, expect, it } from 'vitest'
import { selectContext } from '../../supabase/functions/_shared/search/selectors/selectContext.ts'
import { candidateFixture } from '../database/candidateFixture.ts'

describe('context selection budgets', () => {
  it('retains ranking order and limits the number of selected passages', () => {
    const candidates = Array.from({ length: 10 }, (_, index) =>
      candidateFixture(index),
    )
    expect(selectContext(candidates)).toEqual(candidates.slice(0, 8))
  })
  it('caps passages per document without blocking later independent evidence', () => {
    const same = Array.from({ length: 3 }, (_, index) =>
      candidateFixture(index, { documentId: 'shared' }),
    )
    const independent = candidateFixture(3)
    expect(
      selectContext([...same, independent]).map((value) => value.key),
    ).toEqual(['passage-0', 'passage-1', 'passage-3'])
  })
  it('skips an over-budget passage and still selects later passages that fit', () => {
    const candidates = [
      candidateFixture(0, { tokenCount: 3500 }),
      candidateFixture(1, { tokenCount: 501 }),
      candidateFixture(2, { tokenCount: 500 }),
    ]
    expect(selectContext(candidates).map((value) => value.key)).toEqual([
      'passage-0',
      'passage-2',
    ])
    expect(selectContext([])).toEqual([])
  })
})
