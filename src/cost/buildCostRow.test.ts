import { describe, expect, it } from 'vitest'
import { buildCostRow } from './buildCostRow'
import { costRecordFixture } from './costRecordFixture'

describe('buildCostRow', () => {
  it('prices the tokens at the public list price and estimates reviewer time', () => {
    const row = buildCostRow(costRecordFixture(), [
      { editId: 'e1', verdict: 'accepted', decidedAt: '2026-01-01T10:00:00Z' },
      { editId: 'e2', verdict: 'rejected', decidedAt: '2026-01-01T10:01:00Z' },
      { editId: 'e3', verdict: 'deferred', decidedAt: '2026-01-01T10:02:00Z' },
    ])
    expect(row.aiCostUsd).toBeCloseTo(0.46, 10)
    expect(row.proposedEdits).toBe(3)
    expect(row.decidedEdits).toBe(2)
    expect(row.reviewerSeconds).toBe(120)
    expect(row.minutesPerAudioHour).toBeCloseTo(2 / (125 / 3600), 5)
  })

  it('leaves the cost unconfirmed when the model has no known price', () => {
    const row = buildCostRow(
      costRecordFixture({ correction_model: 'unlisted-model' }),
      [],
    )
    expect(row.aiCostUsd).toBeUndefined()
    expect(row.inputTokens).toBe(30_000)
    expect(row.reviewerSeconds).toBeUndefined()
    expect(row.minutesPerAudioHour).toBeUndefined()
  })

  it('has no cost without an AI pass', () => {
    const row = buildCostRow(
      costRecordFixture({
        correction_model: null,
        correction_input_tokens: null,
        correction_output_tokens: null,
        edit_count: 0,
      }),
      [],
    )
    expect(row.aiCostUsd).toBeUndefined()
    expect(row.correctionModel).toBeNull()
  })
})
