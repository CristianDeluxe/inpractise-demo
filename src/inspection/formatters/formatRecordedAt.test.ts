import { expect, it } from 'vitest'
import { formatRecordedAt } from './formatRecordedAt'

it('reads a stored timestamp to the minute in its own zone', () => {
  expect(formatRecordedAt('2026-09-14T20:27:10.53899+00:00')).toBe(
    '2026-09-14 20:27 UTC',
  )
  expect(formatRecordedAt('2026-09-14T20:27:10.53899Z')).toBe(
    '2026-09-14 20:27 UTC',
  )
  expect(formatRecordedAt('2026-09-14T20:27:10+02:00')).toBe('2026-09-14 20:27')
})

it('returns an unrecognised value untouched rather than inventing a date', () => {
  expect(formatRecordedAt('not a timestamp')).toBe('not a timestamp')
})
