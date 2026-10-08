import { describe, expect, it } from 'vitest'
import { buildCostRow } from './buildCostRow'
import { costRecordFixture } from './costRecordFixture'

describe('buildCostRow', () => {
  it('keeps the measured tokens, scores reliability and estimates spot-check time', () => {
    const row = buildCostRow(costRecordFixture(), [
      { editId: 'e1', verdict: 'accepted', decidedAt: '2026-01-01T10:00:00Z' },
      { editId: 'e2', verdict: 'rejected', decidedAt: '2026-01-01T10:01:00Z' },
      { editId: 'e3', verdict: 'deferred', decidedAt: '2026-01-01T10:02:00Z' },
    ])
    expect(row.inputTokens).toBe(30_000)
    expect(row.outputTokens).toBe(40_000)
    expect(row.reliability?.edits).toEqual({
      accepted: 1,
      rejected: 1,
      auto: 1,
      uncertain: 0,
    })
    expect(row.proposedEdits).toBe(3)
    expect(row.decidedEdits).toBe(2)
    expect(row.reviewerSeconds).toBe(120)
    expect(row.minutesPerAudioHour).toBeCloseTo(2 / (125 / 3600), 5)
  })

  it('has no spot-check time when no decision was saved', () => {
    const row = buildCostRow(costRecordFixture(), [])
    expect(row.reviewerSeconds).toBeUndefined()
    expect(row.minutesPerAudioHour).toBeUndefined()
  })

  it('has no reliability without an AI pass', () => {
    const row = buildCostRow(
      costRecordFixture({
        correction_model: null,
        correction_input_tokens: null,
        correction_output_tokens: null,
        correction: null,
        edit_count: 0,
      }),
      [],
    )
    expect(row.reliability).toBeNull()
    expect(row.correctionModel).toBeNull()
  })
})
