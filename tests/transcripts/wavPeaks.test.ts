import { describe, expect, it } from 'vitest'
import { readWavLayout } from '../../scripts/transcripts/readWavLayout.ts'
import { wavPeaks } from '../../scripts/transcripts/wavPeaks.ts'
import { wavFixture } from './wavFixture.ts'

describe('wavPeaks', () => {
  it('skips unknown chunks, including an odd-sized one, to find the samples', () => {
    const layout = readWavLayout(wavFixture([0, 0.5, -0.5, 0]))
    expect(layout).toMatchObject({
      channels: 1,
      sampleRate: 16_000,
      bitsPerSample: 16,
      dataLength: 8,
    })
  })

  it('reports duration and a loudness envelope scaled so the loudest bucket is 1', () => {
    const quiet = Array.from({ length: 8000 }, () => 0.1)
    const loud = Array.from({ length: 8000 }, () => 0.4)
    const { durationSeconds, peaks } = wavPeaks(
      wavFixture([...quiet, ...loud]),
      2,
    )
    expect(durationSeconds).toBe(1)
    expect(peaks[1]).toBe(1)
    expect(peaks[0]).toBeCloseTo(0.25, 2)
  })

  it('rejects files that are not 16-bit RIFF/WAVE', () => {
    expect(() => readWavLayout(Buffer.from('not a wav file at all'))).toThrow(
      'Not a RIFF/WAVE file',
    )
  })
})
