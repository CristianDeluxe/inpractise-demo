import { describe, expect, it } from 'vitest'
import { resamplePeaks } from './resamplePeaks'
import { seekKeyTarget } from './seekKeyTarget'

describe('waveform helpers', () => {
  it('pools the envelope to the bar count and keeps a visible floor', () => {
    const bars = resamplePeaks([0.2, 0.2, 0.9, 0.2, 0.2, 1, 0.2, 0.2], 4)
    expect(bars).toHaveLength(4)
    expect(Math.max(...bars)).toBe(1)
    expect(Math.min(...bars)).toBeGreaterThanOrEqual(0.06)
    expect(resamplePeaks([], 10)).toEqual([])
  })

  it('maps arrows, Home and End to clamped positions and ignores other keys', () => {
    expect(seekKeyTarget('ArrowRight', 10, 60)).toBe(15)
    expect(seekKeyTarget('ArrowLeft', 2, 60)).toBe(0)
    expect(seekKeyTarget('End', 10, 60)).toBe(60)
    expect(seekKeyTarget('Home', 10, 60)).toBe(0)
    expect(seekKeyTarget('a', 10, 60)).toBeNull()
  })
})
