import { describe, expect, it } from 'vitest'
import { notFoundExplanation } from './notFoundExplanation'

describe('refusal copy', () => {
  it('names retrieval when nothing authorised came back', () => {
    expect(notFoundExplanation(0)).toContain('no passages you are authorised')
  })

  it('says how many passages were read when the model refused', () => {
    const text = notFoundExplanation(7)
    expect(text).toContain('7 passages retrieved')
    expect(text).not.toContain('authorised to read')
  })
})
