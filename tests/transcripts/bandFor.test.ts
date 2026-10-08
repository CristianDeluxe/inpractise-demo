import { describe, expect, it } from 'vitest'
import { bandFor } from '../../scripts/transcripts/bandFor.ts'

describe('confidence bands', () => {
  it('is low below 0.92', () => {
    expect(bandFor(0.919)).toBe('low')
    expect(bandFor(0)).toBe('low')
  })
  it('is medium from 0.92 up to 0.97', () => {
    expect(bandFor(0.92)).toBe('medium')
    expect(bandFor(0.969)).toBe('medium')
  })
  it('is high from 0.97', () => {
    expect(bandFor(0.97)).toBe('high')
    expect(bandFor(1)).toBe('high')
  })
})
