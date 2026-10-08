import { describe, expect, it } from 'vitest'
import { editFixture } from '../fixtures/editFixture'
import { applyEdits } from './applyEdits'
import { placeEdits } from './placeEdits'
import { segmentParagraph } from './segmentParagraph'

describe('edit placement', () => {
  const repeated = 'foo and foo'
  const spaced = 'hello , world  !'

  it('uses the recorded offset when the words repeat', () => {
    const edit = editFixture('e1', 'foo', 'bar', { at: [8] })
    expect(placeEdits(repeated, [edit])).toEqual([{ edit, start: 8, end: 11 }])
    expect(applyEdits(repeated, [edit], () => true)).toBe('foo and bar')
  })

  it('falls back to the first whole-word occurrence for an old model edit', () => {
    const edit = editFixture('e1', 'Ledgar', 'Ledger')
    expect(placeEdits('Ledgars and Ledgar', [edit])).toEqual([
      { edit, start: 12, end: 18 },
    ])
  })

  it('places an old memory edit at every whole-word occurrence', () => {
    const edit = editFixture('e1', 'Zorbex', 'Zorbecks', { origin: 'memory' })
    expect(
      applyEdits('Zorbex met Zorbex, not Zorbexes', [edit], () => true),
    ).toBe('Zorbecks met Zorbecks, not Zorbexes')
  })

  it('drops a recorded offset that no longer holds the words', () => {
    const stale = editFixture('e1', 'foo', 'bar', { at: [4] })
    expect(placeEdits(repeated, [stale])).toEqual([])
    const mixed = editFixture('e1', 'foo', 'bar', { at: [4, 8] })
    expect(placeEdits(repeated, [mixed]).map((item) => item.start)).toEqual([8])
  })

  it('keeps the raw spacing and punctuation where no edit was removed', () => {
    const keep = editFixture('e1', 'world', 'World')
    expect(applyEdits(spaced, [keep], () => false)).toBe(spaced)
    expect(applyEdits(spaced, [], () => true)).toBe(spaced)
  })

  it('leaves out an edit that would overlap an earlier one', () => {
    const first = editFixture('e1', 'Quill on', 'Quillon')
    const second = editFixture('e2', 'on rose', 'arose')
    expect(
      placeEdits('Quill on rose', [first, second]).map((item) => item.edit.id),
    ).toEqual(['e1'])
  })

  it('removes a word without leaving a double space or a space before punctuation', () => {
    const filler = editFixture('e1', 'uh', '', { category: 'filler' })
    expect(applyEdits('so uh we grew', [filler], () => true)).toBe('so we grew')
    expect(applyEdits('we grew uh.', [filler], () => true)).toBe('we grew.')
  })

  it('cuts the raw text into plain runs and edit spans in reading order', () => {
    const edits = [
      editFixture('e2', 'Ledgar', 'Ledger'),
      editFixture('e1', 'Northwynd', 'Northwind'),
    ]
    expect(
      segmentParagraph('At Northwynd Ledgar today.', edits).map((segment) => [
        segment.text,
        segment.edit?.id ?? null,
      ]),
    ).toEqual([
      ['At ', null],
      ['Northwynd', 'e1'],
      [' ', null],
      ['Ledgar', 'e2'],
      [' today.', null],
    ])
  })

  it('applies only the chosen edits and keeps the rest raw', () => {
    const edits = [
      editFixture('e1', 'fourty', 'forty'),
      editFixture('e2', 'peple', 'people'),
    ]
    expect(
      applyEdits('forty and fourty peple', edits, (edit) => edit.id === 'e2'),
    ).toBe('forty and fourty people')
  })
})
