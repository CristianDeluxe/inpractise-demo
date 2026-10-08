import { editFixture } from '@/transcripts/fixtures/editFixture'
import { toDecisionMap } from '@/transcripts/review/toDecisionMap'
import { describe, expect, it } from 'vitest'
import { statusOfEdit } from './statusOfEdit'

describe('statusOfEdit', () => {
  const edit = (confidence: number) =>
    editFixture('e1', 'Ledgar', 'Ledger', { confidence })

  it('applies a model edit exactly at the auto-accept threshold and holds back one below it', () => {
    expect(statusOfEdit(edit(0.8), new Map())).toBe('auto')
    expect(statusOfEdit(edit(0.79), new Map())).toBe('uncertain')
  })

  it('lets a human decision override the model confidence either way', () => {
    const decide = (verdict: 'accepted' | 'rejected') =>
      toDecisionMap([{ editId: 'e1', verdict, decidedAt: 'now' }])
    expect(statusOfEdit(edit(0.1), decide('accepted'))).toBe('accepted')
    expect(statusOfEdit(edit(0.99), decide('rejected'))).toBe('rejected')
  })

  it('treats a deferred decision as undecided', () => {
    const deferred = toDecisionMap([
      { editId: 'e1', verdict: 'deferred', decidedAt: 'now' },
    ])
    expect(statusOfEdit(edit(0.95), deferred)).toBe('auto')
    expect(statusOfEdit(edit(0.5), deferred)).toBe('uncertain')
  })
})
