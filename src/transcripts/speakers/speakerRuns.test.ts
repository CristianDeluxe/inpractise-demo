import { describe, expect, it } from 'vitest'
import { speakerTurnsFixture } from '../fixtures/speakerTurnsFixture'
import { speakerRuns } from './speakerRuns'

describe('speakerRuns', () => {
  it('starts a new block at each change of speaker', () => {
    const words = [10, 20, 30, 35, 41].map((start) => ({
      text: String(start),
      score: 1,
      start,
    }))
    const labels = {
      turns: speakerTurnsFixture,
      names: { host: 'Host', guest: 'Guest' },
    }
    expect(
      speakerRuns(labels, words).map((run) => [
        run.role,
        run.words.map((word) => word.text),
      ]),
    ).toEqual([
      ['host', ['10', '20']],
      ['guest', ['30', '35']],
      ['host', ['41']],
    ])
  })

  it('keeps one block without diarization', () => {
    const words = [{ text: 'a', score: 1, start: 0 }]
    expect(speakerRuns(null, words)).toEqual([{ role: undefined, words }])
  })
})
