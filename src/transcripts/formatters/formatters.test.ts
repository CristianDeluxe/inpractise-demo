import { describe, expect, it } from 'vitest'
import { formatDuration } from './formatDuration'
import { formatPercent } from './formatPercent'
import { formatTimestamp } from './formatTimestamp'

describe('transcript formatters', () => {
  it('formats timestamps as mm:ss and h:mm:ss', () => {
    expect(formatTimestamp(65.9)).toBe('01:05')
    expect(formatTimestamp(3725)).toBe('1:02:05')
    expect(formatTimestamp(-3)).toBe('00:00')
  })

  it('formats durations and percentages', () => {
    expect(formatDuration(1500)).toBe('25 min')
    expect(formatDuration(4500)).toBe('1 h 15 min')
    expect(formatPercent(1, 10)).toBe('10%')
    expect(formatPercent(1, 100)).toBe('1.0%')
    expect(formatPercent(1, 0)).toBe('0%')
  })
})
