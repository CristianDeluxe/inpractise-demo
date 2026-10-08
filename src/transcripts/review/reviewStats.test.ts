import { describe, expect, it } from 'vitest'
import { correctionFixture } from '../fixtures/correctionFixture'
import { transcriptFixture } from '../fixtures/transcriptFixture'
import { collectCorrectedTerms } from './collectCorrectedTerms'
import { correctedParagraphMap } from './correctedParagraphMap'
import { countByCategory } from './countByCategory'
import { countFlaggedSpans } from './countFlaggedSpans'
import { countPending } from './countPending'
import { countVerdicts } from './countVerdicts'
import { listEdits } from './listEdits'
import { needsAttention } from './needsAttention'
import { toDecisionMap } from './toDecisionMap'

describe('review statistics', () => {
  const edits = listEdits(correctionFixture())
  const decisions = toDecisionMap([
    { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
    { editId: 'e3', verdict: 'accepted', decidedAt: 'now' },
  ])

  it('counts pending, verdicts and categories', () => {
    expect(countPending(edits, decisions)).toBe(1)
    expect(countVerdicts(edits, decisions)).toEqual({
      accepted: 1,
      rejected: 1,
      deferred: 0,
      pending: 1,
      total: 3,
    })
    expect(countByCategory(edits)).toEqual([
      ['entity', 2],
      ['grammar', 1],
    ])
  })

  it('counts runs of low words as one span each', () => {
    expect(countFlaggedSpans(transcriptFixture())).toBe(2)
  })

  it('groups non-rejected term corrections', () => {
    expect(collectCorrectedTerms(edits, decisions)).toEqual([
      { from: 'Ledgar', to: 'Ledger', count: 1 },
    ])
  })

  it('flags paragraphs with low words or edits only', () => {
    const corrected = correctedParagraphMap(correctionFixture())
    const flags = transcriptFixture().paragraphs.map((paragraph) =>
      needsAttention(paragraph, corrected.get(paragraph.id)),
    )
    expect(flags).toEqual([true, true, false])
  })
})
