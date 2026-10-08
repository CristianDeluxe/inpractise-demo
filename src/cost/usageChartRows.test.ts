import { describe, expect, it } from 'vitest'
import { buildCostRow } from './buildCostRow'
import { costRecordFixture } from './costRecordFixture'
import { reviewerChartRows } from './reviewerChartRows'
import { usageChartRows } from './usageChartRows'

describe('chart rows from measurements', () => {
  it('splits a day into input and output tokens and prices it as the answer model', () => {
    const [row] = usageChartRows([
      {
        day: '2026-10-07',
        requests: 7,
        inputTokens: 100_000,
        outputTokens: 20_000,
        totalTokens: 120_000,
      },
    ])
    expect(row?.text).toBe('120,000 tokens, USD 0.0720, 7 requests')
    expect(row?.segments.map((segment) => segment.value)).toEqual([
      100_000, 20_000,
    ])
  })
  it('shows reviewer minutes only when they were measured', () => {
    const measured = buildCostRow(costRecordFixture(), [
      { editId: 'e1', verdict: 'accepted', decidedAt: '2026-01-01T10:00:00Z' },
      { editId: 'e2', verdict: 'accepted', decidedAt: '2026-01-01T10:10:00Z' },
    ])
    const unmeasured = buildCostRow(
      costRecordFixture({ transcript_id: 'b' }),
      [],
    )
    expect(
      reviewerChartRows([measured, unmeasured]).map((row) => row.text),
    ).toEqual(['288.0 min per audio hour', 'not measured yet'])
  })
})
