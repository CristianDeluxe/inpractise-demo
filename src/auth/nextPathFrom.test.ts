import { describe, expect, it } from 'vitest'
import { nextPathFrom } from './nextPathFrom'

describe('nextPathFrom', () => {
  it('returns a path on this site and nothing else', () => {
    expect(nextPathFrom('?next=%2Fapp%2Ftranscripts%2Fx')).toBe(
      '/app/transcripts/x',
    )
    expect(nextPathFrom('?next=https%3A%2F%2Fevil.example')).toBeUndefined()
    expect(nextPathFrom('?next=%2F%2Fevil.example')).toBeUndefined()
    expect(nextPathFrom('?next=%2F%5Cevil.example')).toBeUndefined()
    expect(nextPathFrom('')).toBeUndefined()
  })
})
