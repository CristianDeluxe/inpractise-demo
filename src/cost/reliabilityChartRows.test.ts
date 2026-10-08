import { describe, expect, it } from 'vitest'
import { buildCostRow } from './buildCostRow'
import { costRecordFixture } from './costRecordFixture'
import { reliabilityChartRows } from './reliabilityChartRows'

describe('reliabilityChartRows', () => {
  it('draws the reliability of an AI-final text and labels a missing pass in words', () => {
    const rows = [
      buildCostRow(costRecordFixture(), []),
      buildCostRow(
        costRecordFixture({
          transcript_id: 'b',
          correction_model: null,
          correction: null,
        }),
        [],
      ),
    ]
    const chart = reliabilityChartRows(rows)
    expect(chart.map((row) => row.text)).toEqual([
      '94.1%, 1 word to spot-check',
      'no AI pass yet',
    ])
    expect(chart[0]?.segments[0]?.value).toBeCloseTo(94.1176, 3)
    expect(chart[1]?.segments).toHaveLength(0)
  })
})
