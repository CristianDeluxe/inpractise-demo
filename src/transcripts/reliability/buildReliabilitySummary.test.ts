import { bundleFixture } from '@/transcripts/fixtures/bundleFixture'
import { correctedParagraphFixture } from '@/transcripts/fixtures/correctedParagraphFixture'
import { correctionFixture } from '@/transcripts/fixtures/correctionFixture'
import { editFixture } from '@/transcripts/fixtures/editFixture'
import { toDecisionMap } from '@/transcripts/review/toDecisionMap'
import { describe, expect, it } from 'vitest'
import { buildReliabilitySummary } from './buildReliabilitySummary'

describe('buildReliabilitySummary', () => {
  const { transcript, correction } = bundleFixture()

  it('is the share of final words scoring at least 0.9, with the edit counts', () => {
    const summary = buildReliabilitySummary(transcript, correction, new Map())
    expect(summary).toEqual({
      words: 17,
      reliableWords: 16,
      spotCheckWords: 1,
      reliability: 16 / 17,
      edits: { accepted: 0, rejected: 0, auto: 3, uncertain: 0 },
    })
  })

  it('scores the raw ASR words when no correction ran', () => {
    const summary = buildReliabilitySummary(transcript, null, new Map())
    expect(summary.spotCheckWords).toBe(4)
    expect(summary.edits.auto).toBe(0)
  })

  it('recomputes when a person decides: a reverted edit is human-confirmed raw text', () => {
    const decisions = toDecisionMap([
      { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
    ])
    const summary = buildReliabilitySummary(transcript, correction, decisions)
    expect(summary.edits).toEqual({
      accepted: 0,
      rejected: 1,
      auto: 2,
      uncertain: 0,
    })
    expect(summary.spotCheckWords).toBe(1)
  })

  it('counts an edit that cannot be placed as uncertain and leaves its words as heard', () => {
    const missing = {
      ...correctionFixture(),
      paragraphs: [
        correctedParagraphFixture(
          [
            editFixture('x', 'absent words', 'present words', {
              paragraphId: 'p0003',
              confidence: 0.95,
            }),
          ],
          'p0003',
        ),
      ],
    }
    const summary = buildReliabilitySummary(transcript, missing, new Map())
    expect(summary.edits).toEqual({
      accepted: 0,
      rejected: 0,
      auto: 0,
      uncertain: 1,
    })
  })

  it('reports zero reliability for a transcript without words', () => {
    const summary = buildReliabilitySummary(
      { ...transcript, paragraphs: [] },
      null,
      new Map(),
    )
    expect(summary.reliability).toBe(0)
  })
})
