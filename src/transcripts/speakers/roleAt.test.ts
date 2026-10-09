import { describe, expect, it } from 'vitest'
import { speakerTurnsFixture } from '../fixtures/speakerTurnsFixture'
import { roleAt } from './roleAt'

describe('roleAt', () => {
  it('names the role speaking at a second', () => {
    expect(roleAt(speakerTurnsFixture, 0)).toBe('host')
    expect(roleAt(speakerTurnsFixture, 30)).toBe('guest')
    expect(roleAt(speakerTurnsFixture, 41)).toBe('host')
  })
})
