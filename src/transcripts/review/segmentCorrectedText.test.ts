import { describe, expect, it } from 'vitest'
import { editFixture } from '../fixtures/editFixture'
import { segmentCorrectedText } from './segmentCorrectedText'

describe('segmentCorrectedText', () => {
  it('cuts the corrected text at each located replacement, in order', () => {
    const edits = [
      editFixture('e1', 'Northwynd', 'Northwind'),
      editFixture('e2', 'Ledgar', 'Ledger'),
    ]
    const segments = segmentCorrectedText(
      'Revenue grew at Northwind Ledger last year.',
      edits,
    )
    expect(
      segments.map((segment) => [segment.text, segment.edit?.id ?? null]),
    ).toEqual([
      ['Revenue grew at ', null],
      ['Northwind', 'e1'],
      [' ', null],
      ['Ledger', 'e2'],
      [' last year.', null],
    ])
  })

  it('leaves the text whole when a replacement cannot be found', () => {
    const segments = segmentCorrectedText('Nothing here.', [
      editFixture('e1', 'x', 'missing'),
      editFixture('e2', 'uh', ''),
    ])
    expect(segments).toEqual([{ text: 'Nothing here.', edit: null }])
  })
})
