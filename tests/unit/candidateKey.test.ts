import { describe, expect, it } from 'vitest'
import { candidateKey } from '../../supabase/functions/_shared/search/candidateKey.ts'
import { branchRowFixture } from '../helpers/branchRowFixture.ts'

describe('candidate identity', () => {
  it('keys a passage by document, revision and passage so the branches fuse', () => {
    expect(candidateKey(branchRowFixture())).toBe('doc-1:rev-1:p-1')
    expect(candidateKey(branchRowFixture({ branch: 'vector', rank: 7 }))).toBe(
      candidateKey(branchRowFixture()),
    )
  })
  it('keeps the same passage of a different revision distinct', () => {
    expect(candidateKey(branchRowFixture({ revision_id: 'rev-2' }))).not.toBe(
      candidateKey(branchRowFixture()),
    )
  })
})
