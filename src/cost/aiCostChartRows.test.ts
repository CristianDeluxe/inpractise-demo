import { describe, expect, it } from 'vitest'
import { aiCostChartRows } from './aiCostChartRows'
import { buildCostRow } from './buildCostRow'
import { costRecordFixture } from './costRecordFixture'

describe('aiCostChartRows', () => {
  it('draws a priced pass, and labels the others in words', () => {
    const rows = [
      buildCostRow(costRecordFixture(), []),
      buildCostRow(
        costRecordFixture({ transcript_id: 'b', correction_model: 'unlisted' }),
        [],
      ),
      buildCostRow(
        costRecordFixture({
          transcript_id: 'c',
          correction_model: null,
          correction_input_tokens: null,
          correction_output_tokens: null,
        }),
        [],
      ),
    ]
    const chart = aiCostChartRows(rows)
    expect(chart.map((row) => row.text)).toEqual([
      'USD 13.25 per audio hour',
      'price not confirmed',
      'no AI pass yet',
    ])
    expect(chart[0]?.segments).toHaveLength(1)
    expect(chart[1]?.segments).toHaveLength(0)
  })
})
