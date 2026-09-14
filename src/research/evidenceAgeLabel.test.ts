import { describe, expect, it } from 'vitest'
import { evidenceAgeLabel } from './evidenceAgeLabel'

describe('evidenceAgeLabel', () => {
  it('counts short spans in days', () => {
    expect(evidenceAgeLabel(33)).toBe('33 days old')
  })
  it('counts longer spans in months', () => {
    expect(evidenceAgeLabel(730)).toBe('24 months old')
  })
  it('names today explicitly rather than showing zero', () => {
    expect(evidenceAgeLabel(0)).toBe('published today')
  })
})
