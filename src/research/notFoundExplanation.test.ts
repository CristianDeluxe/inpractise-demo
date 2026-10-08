import { describe, expect, it } from 'vitest'
import { notFoundExplanation } from './notFoundExplanation'

describe('refusal copy', () => {
  it('names the search when nothing authorised came back', () => {
    expect(notFoundExplanation(0)).toContain('no excerpt you are authorised')
  })

  it('says no quote answers it when excerpts were read and refused', () => {
    const text = notFoundExplanation(7)
    expect(text).toBe('No quote in these two interviews answers this.')
    expect(text).not.toContain('authorised to read')
  })
})
