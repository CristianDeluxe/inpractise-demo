import { describe, expect, it } from 'vitest'
import { runIndexAt } from './runIndexAt'

describe('runIndexAt', () => {
  it('picks the speaker block being heard', () => {
    expect(runIndexAt([10, 20, 30], 5)).toBe(0)
    expect(runIndexAt([10, 20, 30], 19.99)).toBe(1)
    expect(runIndexAt([10, 20, 30], 31)).toBe(2)
  })
})
