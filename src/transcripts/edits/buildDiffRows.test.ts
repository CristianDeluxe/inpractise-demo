import { describe, expect, it } from 'vitest'
import { editFixture } from '../fixtures/editFixture'
import { wordsOf } from '../fixtures/wordsOf'
import { buildDiffRows } from './buildDiffRows'
import { segmentParagraph } from './segmentParagraph'

describe('buildDiffRows', () => {
  const raw = 'Revenue rose at Northwynd. Did it? Yes. Fourty percent.'
  const edits = [
    editFixture('e1', 'Northwynd', 'Northwind'),
    editFixture('e2', 'Fourty', 'Forty'),
  ]

  it('pairs each sentence with its raw words', () => {
    const rows = buildDiffRows(segmentParagraph(raw, edits), wordsOf(raw))
    expect(
      rows.map((row) => row.words.map((word) => word.text).join(' ')),
    ).toEqual([
      'Revenue rose at Northwynd.',
      'Did it?',
      'Yes.',
      'Fourty percent.',
    ])
    expect(rows.map((row) => row.firstWord)).toEqual([0, 4, 6, 7])
  })

  it('keeps each edit in the row of its sentence', () => {
    const rows = buildDiffRows(segmentParagraph(raw, edits), wordsOf(raw))
    expect(
      rows.map((row) =>
        row.segments.flatMap((s) => (s.edit ? [s.edit.id] : [])),
      ),
    ).toEqual([['e1'], [], [], ['e2']])
  })

  it('never splits an edit that spans a sentence end', () => {
    const span = [editFixture('s', 'Northwynd. Did', 'Northwynd, did')]
    const rows = buildDiffRows(segmentParagraph(raw, span), wordsOf(raw))
    expect(rows).toHaveLength(3)
    expect(rows[0]?.segments.some((segment) => segment.edit?.id === 's')).toBe(
      true,
    )
  })
})
