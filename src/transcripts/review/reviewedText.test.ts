import { describe, expect, it } from 'vitest'
import { correctionFixture } from '../fixtures/correctionFixture'
import { editFixture } from '../fixtures/editFixture'
import { transcriptFixture } from '../fixtures/transcriptFixture'
import { reviewedParagraphText } from './reviewedParagraphText'
import { struckWords } from './struckWords'
import { toDecisionMap } from './toDecisionMap'

describe('reviewed paragraph text', () => {
  it('keeps accepted and pending edits and reverts rejected ones', () => {
    const decisions = toDecisionMap([
      { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
    ])
    const edits = [
      editFixture('e1', 'Northwynd', 'Northwind'),
      editFixture('e2', 'Ledgar', 'Ledger'),
    ]
    expect(
      reviewedParagraphText('at Northwynd Ledgar today', edits, decisions),
    ).toBe('at Northwynd Ledger today')
  })

  it('never touches an identical word the edit did not rewrite', () => {
    const decisions = toDecisionMap([
      { editId: 'x', verdict: 'rejected', decidedAt: 'now' },
    ])
    const edit = editFixture('x', 'fourty', 'forty', { at: [10] })
    expect(reviewedParagraphText('forty and fourty', [edit], decisions)).toBe(
      'forty and fourty',
    )
    expect(reviewedParagraphText('forty and fourty', [edit], new Map())).toBe(
      'forty and forty',
    )
  })

  it('strikes the raw words an edit still rewrites', () => {
    const paragraph = transcriptFixture().paragraphs[0]
    const corrected = correctionFixture().paragraphs[0]
    if (paragraph === undefined || corrected === undefined)
      throw new Error('fixture')
    const words = paragraph.words.map((word) => word.text)
    const struck = struckWords(paragraph, corrected.edits, new Map())
    expect(words.filter((_, index) => struck[index])).toEqual([
      'Northwynd',
      'Ledgar',
    ])
    const rejected = toDecisionMap([
      { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
    ])
    const afterReject = struckWords(paragraph, corrected.edits, rejected)
    expect(words.filter((_, index) => afterReject[index])).toEqual(['Ledgar'])
  })
})
