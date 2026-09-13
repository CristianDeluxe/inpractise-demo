import { describe, expect, it } from 'vitest'
import { assertRetrievalGate } from '../../scripts/db/assertRetrievalGate.ts'
import { classifyFailure } from '../../scripts/db/classifyFailure.ts'
import { fuseRanks } from '../../supabase/functions/_shared/search/fuseRanks.ts'

describe('ranking and diagnosed failure', () => {
  it('uses one-based reciprocal ranks without cosine cutoffs', () => {
    expect(
      fuseRanks([[{ key: 'a', rank: 1 }], [{ key: 'a', rank: 1 }]]),
    ).toEqual([{ key: 'a', fusionScore: 2 / 61 }])
  })
  it('breaks equal scores deterministically', () => {
    expect(
      fuseRanks([[{ key: 'b', rank: 1 }], [{ key: 'a', rank: 1 }]]).map(
        (r) => r.key,
      ),
    ).toEqual(['a', 'b'])
  })
  it('rejects duplicate entries and zero ranks', () => {
    expect(() => fuseRanks([[{ key: 'a', rank: 0 }]])).toThrow()
    expect(() =>
      fuseRanks([
        [
          { key: 'a', rank: 1 },
          { key: 'a', rank: 2 },
        ],
      ]),
    ).toThrow()
  })
  it('separates candidate miss from selection miss and fails the gate', () => {
    expect(
      classifyFailure({ goldIds: ['a'], candidateIds: ['a'], contextIds: [] }),
    ).toBe('selection_miss')
    expect(() => {
      assertRetrievalGate({ goldIds: ['a'], candidateIds: [], contextIds: [] })
    }).toThrow('retrieval_miss')
    expect(() => {
      assertRetrievalGate({ goldIds: [], candidateIds: [], contextIds: [] })
    }).toThrow('Gold labels required')
  })
})
