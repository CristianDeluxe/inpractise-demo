import { expect, it } from 'vitest'
import { formatPublishedDate } from './formatPublishedDate'

it('keeps the calendar date the server sent, whatever the offset', () => {
  expect(formatPublishedDate('2026-08-28T09:00:00+00:00')).toBe('2026-08-28')
  expect(formatPublishedDate('2026-09-02T23:30:00-08:00')).toBe('2026-09-02')
})

it('returns a value that is not an ISO timestamp untouched', () => {
  expect(formatPublishedDate('2026-08-14')).toBe('2026-08-14')
  expect(formatPublishedDate('Filed with the SEC')).toBe('Filed with the SEC')
})
