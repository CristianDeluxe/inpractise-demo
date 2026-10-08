import { describe, expect, it } from 'vitest'
import { estimateReviewerSeconds } from './estimateReviewerSeconds'

describe('estimateReviewerSeconds', () => {
  const start = '2026-01-01T10:00:00Z'
  it('sums the gaps between consecutive decisions in time order', () => {
    expect(
      estimateReviewerSeconds([
        '2026-01-01T10:01:00Z',
        start,
        '2026-01-01T10:03:00Z',
      ]),
    ).toBe(180)
  })
  it('ignores a gap above ten minutes but keeps one of exactly ten', () => {
    expect(
      estimateReviewerSeconds([
        start,
        '2026-01-01T10:10:00Z',
        '2026-01-01T10:20:01Z',
        '2026-01-01T10:21:00Z',
      ]),
    ).toBe(659)
  })
  it('measures nothing from fewer than two readable timestamps', () => {
    expect(estimateReviewerSeconds([])).toBeUndefined()
    expect(estimateReviewerSeconds([start])).toBeUndefined()
    expect(estimateReviewerSeconds([start, 'now'])).toBeUndefined()
  })
})
