import { describe, expect, it } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { mergedDuration } from './mergedDuration'
import { relistenSeconds } from './relistenSeconds'

describe('relisten time', () => {
  it('merges overlapping windows and counts each second once', () => {
    expect(
      mergedDuration([
        { start: 10, end: 14 },
        { start: 0, end: 3 },
        { start: 12, end: 16 },
      ]),
    ).toBe(9)
    expect(mergedDuration([])).toBe(0)
  })

  it('pads low-confidence words and never exceeds the audio it covers', () => {
    const { transcript } = bundleFixture()
    const seconds = relistenSeconds(transcript)
    expect(seconds).toBeGreaterThan(0)
    const last = transcript.paragraphs.at(-1)?.end ?? 0
    expect(seconds).toBeLessThanOrEqual(last + 3)
  })
})
