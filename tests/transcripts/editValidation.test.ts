import { describe, expect, it } from 'vitest'
import { assembleParagraph } from '../../scripts/transcripts/assembleParagraph.ts'
import { keepVerbatimEdits } from '../../scripts/transcripts/keepVerbatimEdits.ts'
import { preparedParagraphFixture } from './preparedParagraphFixture.ts'
import { proposedEditFixture } from './proposedEditFixture.ts'

describe('edit validation', () => {
  const prepared = preparedParagraphFixture()

  it('drops edits whose from is not verbatim in the paragraph and counts them', () => {
    const result = keepVerbatimEdits(prepared, [
      proposedEditFixture('met'),
      proposedEditFixture('absent words'),
    ])
    expect(result.edits.map((edit) => edit.from)).toEqual(['met'])
    expect(result.dropped).toBe(1)
  })

  it('resolves echoed markup and case differences to the verbatim span', () => {
    const result = keepVerbatimEdits(prepared, [
      proposedEditFixture('[[met|0.80]]', 'saw'),
      proposedEditFixture('We Met', 'we saw'),
    ])
    expect(result.edits.map((edit) => edit.from)).toEqual(['we met', 'met'])
    expect(result.dropped).toBe(0)
  })

  it('drops empty edits and ignores no-op edits without counting them', () => {
    const result = keepVerbatimEdits(prepared, [
      proposedEditFixture('', 'a'),
      proposedEditFixture('met', 'met'),
    ])
    expect(result.edits).toEqual([])
    expect(result.dropped).toBe(1)
  })

  it('orders edits by position and clamps confidence', () => {
    const result = keepVerbatimEdits(prepared, [
      proposedEditFixture('today', 'now', 4),
      proposedEditFixture('we', 'We', -1),
    ])
    expect(result.edits.map((edit) => edit.from)).toEqual(['we', 'today'])
    expect(result.edits.map((edit) => edit.confidence)).toEqual([0, 1])
    expect(result.edits.every((edit) => edit.origin === 'model')).toBe(true)
  })

  it('gives stable ids with memory edits first', () => {
    const { paragraph } = assembleParagraph(prepared, {
      paragraphId: 'p0007',
      text: 'We met Zorbecks now',
      edits: [
        proposedEditFixture('today', 'now'),
        proposedEditFixture('we', 'We'),
      ],
    })
    expect(paragraph.edits.map((edit) => edit.id)).toEqual([
      'p0007-e1',
      'p0007-e2',
      'p0007-e3',
    ])
    expect(paragraph.edits.map((edit) => edit.origin)).toEqual([
      'memory',
      'model',
      'model',
    ])
  })

  it('keeps the post-memory text and memory edits when the model skipped the paragraph', () => {
    const { paragraph, dropped } = assembleParagraph(prepared, undefined)
    expect(paragraph.text).toBe('we met Zorbecks today')
    expect(paragraph.edits).toHaveLength(1)
    expect(dropped).toBe(0)
  })
})
