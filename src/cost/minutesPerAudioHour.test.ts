import { describe, expect, it } from 'vitest'
import { minutesPerAudioHour } from './minutesPerAudioHour'

describe('minutesPerAudioHour', () => {
  it('scales reviewer minutes to one hour of audio', () => {
    expect(minutesPerAudioHour(600, 1800)).toBe(20)
  })
  it('is undefined without audio', () => {
    expect(minutesPerAudioHour(600, 0)).toBeUndefined()
  })
})
