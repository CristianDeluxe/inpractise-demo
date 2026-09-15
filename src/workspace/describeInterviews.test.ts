import { describe, expect, it } from 'vitest'
import { companySummaryFixture } from './companySummaryFixture'
import { describeInterviews } from './describeInterviews'

describe('describeInterviews', () => {
  it('says nothing when a company has no interviews', () => {
    expect(
      describeInterviews(companySummaryFixture({ interviews: 0 })),
    ).toBeUndefined()
  })
  it('gives a date range across several interviews', () => {
    expect(describeInterviews(companySummaryFixture({}))).toBe(
      '2 synthetic interviews, dated 2026-03-01 to 2026-05-01',
    )
  })
  it('gives one date when every interview shares it', () => {
    expect(
      describeInterviews(
        companySummaryFixture({
          interviews: 1,
          lastInterviewDate: '2026-03-01',
        }),
      ),
    ).toBe('1 synthetic interview, dated 2026-03-01')
  })
  it('omits dates the rows do not carry', () => {
    expect(
      describeInterviews(
        companySummaryFixture({
          firstInterviewDate: undefined,
          lastInterviewDate: undefined,
        }),
      ),
    ).toBe('2 synthetic interviews')
  })
})
