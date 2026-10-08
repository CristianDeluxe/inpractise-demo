import { describe, expect, it } from 'vitest'
import { correctionFixture } from '../fixtures/correctionFixture'
import { editFixture } from '../fixtures/editFixture'
import { revertRejectedEdits } from './revertRejectedEdits'
import { toDecisionMap } from './toDecisionMap'

describe('revertRejectedEdits', () => {
  it('keeps accepted and pending edits and reverts rejected ones', () => {
    const paragraph = correctionFixture().paragraphs[0]
    if (paragraph === undefined) throw new Error('fixture')
    const decisions = toDecisionMap([
      { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
      { editId: 'e2', verdict: 'accepted', decidedAt: 'now' },
    ])
    expect(
      revertRejectedEdits(paragraph.text, paragraph.edits, decisions),
    ).toBe('Revenue grew twelve percent at Northwynd Ledger last year.')
  })

  it('replaces only the first occurrence', () => {
    const decisions = toDecisionMap([
      { editId: 'x', verdict: 'rejected', decidedAt: 'now' },
    ])
    const edit = editFixture('x', 'fourty', 'forty')
    expect(revertRejectedEdits('forty and forty', [edit], decisions)).toBe(
      'fourty and forty',
    )
  })
})
