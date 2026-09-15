import { describe, expect, it } from 'vitest'
import { companySummaryFixture } from './companySummaryFixture'
import { describeInterviewDates } from './describeInterviewDates'

describe('describeInterviewDates', () => {
  it('gives a range across several interviews', () => {
    expect(describeInterviewDates(companySummaryFixture())).toEqual([
      '2026-03-01',
      '2026-05-01',
    ])
  })
  it('gives one date when every interview shares it', () => {
    expect(
      describeInterviewDates(
        companySummaryFixture({ lastInterviewDate: '2026-03-01' }),
      ),
    ).toEqual(['2026-03-01'])
  })
  it('gives nothing when the rows carry no date', () => {
    expect(
      describeInterviewDates(
        companySummaryFixture({
          firstInterviewDate: undefined,
          lastInterviewDate: undefined,
        }),
      ),
    ).toBeUndefined()
  })
})
