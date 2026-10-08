import { expect, it } from 'vitest'
import { isInterviewKind } from './isInterviewKind'

it('accepts the interview kind and rejects every filing kind', () => {
  expect(isInterviewKind('synthetic_interview')).toBe(true)
  expect(isInterviewKind('public_interview')).toBe(true)
  expect(isInterviewKind('sec_filing')).toBe(false)
  expect(isInterviewKind('annual_report_pdf')).toBe(false)
})
