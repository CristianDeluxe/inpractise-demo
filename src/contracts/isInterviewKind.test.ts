import { expect, it } from 'vitest'
import { isInterviewKind } from './isInterviewKind'

it('accepts the public interview kind and rejects every other kind', () => {
  expect(isInterviewKind('public_interview')).toBe(true)
  expect(isInterviewKind('synthetic_interview')).toBe(false)
  expect(isInterviewKind('sec_filing')).toBe(false)
  expect(isInterviewKind('annual_report_pdf')).toBe(false)
})
