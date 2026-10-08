import { describe, expect, it } from 'vitest'
import { editFixture } from '../fixtures/editFixture'
import { reportSegments } from './reportSegments'
import { toDecisionMap } from './toDecisionMap'

describe('report segments', () => {
  const edits = [
    editFixture('e1', 'Northwynd', 'Northwind'),
    editFixture('e2', 'Ledgar', 'Ledger'),
    editFixture('e3', 'fourty', 'forty'),
  ]
  const raw = 'at Northwynd Ledgar fourty'

  it('marks undecided wording pending and accepted wording plain', () => {
    const decisions = toDecisionMap([
      { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
      { editId: 'e3', verdict: 'rejected', decidedAt: 'now' },
    ])
    expect(
      reportSegments(raw, edits, decisions).map((s) => [s.text, s.pending]),
    ).toEqual([
      ['at ', false],
      ['Northwind', false],
      [' ', false],
      ['Ledger', true],
      [' ', false],
      ['fourty', false],
    ])
  })

  it('keeps the words of a pending or flagged removal and drops an accepted one', () => {
    const filler = [editFixture('e1', 'uh', '', { category: 'filler' })]
    const removed = reportSegments('so uh we', filler, toDecisionMap([]))
    expect(removed[1]).toEqual({ text: 'uh', pending: true, removed: true })
    const flagged = toDecisionMap([
      { editId: 'e1', verdict: 'deferred', decidedAt: 'now' },
    ])
    expect(reportSegments('so uh we', filler, flagged)[1]?.removed).toBe(true)
    const accepted = toDecisionMap([
      { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
    ])
    expect(
      reportSegments('so uh we', filler, accepted).map((s) => s.text),
    ).toEqual(['so ', ' we'])
  })
})
