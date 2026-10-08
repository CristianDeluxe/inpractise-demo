// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { correctionFixture } from '../fixtures/correctionFixture'
import { transcriptFixture } from '../fixtures/transcriptFixture'
import { scoreTranscript } from '../reliability/scoreTranscript'
import { adjacentId } from './adjacentId'
import { applyVerdict } from './applyVerdict'
import { firstEditIdIn } from './firstEditIdIn'
import { isTypingTarget } from './isTypingTarget'
import { listEdits } from './listEdits'
import { nextPendingEditId } from './nextPendingEditId'
import { paragraphIdAt } from './paragraphIdAt'
import { paragraphNote } from './paragraphNote'
import { toDecisionMap } from './toDecisionMap'

describe('review navigation', () => {
  const ids = ['a', 'b', 'c']
  const edits = listEdits(correctionFixture())
  const decided = toDecisionMap([
    { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
  ])

  it('steps between flagged ids and clamps at the ends', () => {
    expect(adjacentId(ids, null, 1)).toBe('a')
    expect(adjacentId(ids, null, -1)).toBe('c')
    expect(adjacentId(ids, 'a', 1)).toBe('b')
    expect(adjacentId(ids, 'a', -1)).toBe('a')
    expect(adjacentId(ids, 'c', 1)).toBe('c')
    expect(adjacentId(ids, 'zzz', 1)).toBe('a')
    expect(adjacentId([], 'a', 1)).toBeNull()
  })

  it('finds the next pending edit and wraps around', () => {
    expect(nextPendingEditId(edits, decided, null)).toBe('e2')
    expect(nextPendingEditId(edits, decided, 'e2')).toBe('e3')
    expect(nextPendingEditId(edits, decided, 'e3')).toBe('e2')
    const all = toDecisionMap(
      edits.map((edit) => ({
        editId: edit.id,
        verdict: 'accepted' as const,
        decidedAt: 'now',
      })),
    )
    expect(nextPendingEditId(edits, all, null)).toBeNull()
  })

  it('picks the first pending edit of a paragraph, else its first edit', () => {
    expect(firstEditIdIn(edits, 'p0001', decided)).toBe('e2')
    expect(firstEditIdIn(edits, 'p0001', toDecisionMap([]))).toBe('e1')
    expect(firstEditIdIn(edits, 'p0003', decided)).toBeNull()
    const both = toDecisionMap([
      { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
      { editId: 'e2', verdict: 'accepted', decidedAt: 'now' },
    ])
    expect(firstEditIdIn(edits, 'p0001', both)).toBe('e1')
  })

  it('finds the paragraph playing at a time', () => {
    const { paragraphs } = transcriptFixture()
    expect(paragraphIdAt(paragraphs, 0)).toBe('p0001')
    expect(paragraphIdAt(paragraphs, 66)).toBe('p0002')
    expect(paragraphIdAt(paragraphs, 500)).toBe('p0003')
    expect(paragraphIdAt([], 5)).toBeNull()
  })

  it('applies and clears verdicts without mutating the input', () => {
    const start = new Map()
    const next = applyVerdict(start, ['e1', 'e2'], 'rejected', 'now')
    expect(start.size).toBe(0)
    expect([...next.keys()]).toEqual(['e1', 'e2'])
    expect(applyVerdict(next, ['e1'], null, 'now').has('e1')).toBe(false)
  })

  it('scores the raw words where there is no correction', () => {
    const report = scoreTranscript(transcriptFixture(), null, toDecisionMap([]))
    expect(report[2]?.words.map((word) => word.text)).toEqual([
      'Thanks',
      'everyone.',
    ])
    expect(report[1]?.start).toBe(65)
  })

  it('summarises a paragraph for the margin', () => {
    const corrected = correctionFixture().paragraphs
    const notes = transcriptFixture().paragraphs.map((paragraph, index) =>
      paragraphNote(paragraph, corrected[index]),
    )
    expect(notes).toEqual(['2 low / 2 edits', '1 low / 1 edit', null])
  })

  it('does not treat keys typed into fields as shortcuts', () => {
    expect(isTypingTarget(document.createElement('input'))).toBe(true)
    expect(isTypingTarget(document.createElement('div'))).toBe(false)
    expect(isTypingTarget(null)).toBe(false)
  })
})
