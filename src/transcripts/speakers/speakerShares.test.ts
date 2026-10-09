import { describe, expect, it } from 'vitest'
import { speakerTurnsFixture } from '../fixtures/speakerTurnsFixture'
import { speakerShares } from './speakerShares'

describe('speakerShares', () => {
  it('splits speaking time and merges back-to-back turns of one speaker', () => {
    const shares = speakerShares({
      turns: [...speakerTurnsFixture, { role: 'host', start: 60, end: 70 }],
      names: { host: 'Host Name', guest: 'Guest Name' },
    })
    expect(shares).toEqual([
      {
        role: 'host',
        name: 'Host Name',
        seconds: 57,
        share: 57 / 69,
        turns: 2,
        longestSeconds: 30,
      },
      {
        role: 'guest',
        name: 'Guest Name',
        seconds: 12,
        share: 12 / 69,
        turns: 1,
        longestSeconds: 12,
      },
    ])
  })
})
