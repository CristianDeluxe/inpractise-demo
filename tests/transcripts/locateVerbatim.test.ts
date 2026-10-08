import { describe, expect, it } from 'vitest'
import { locateVerbatim } from '../../scripts/transcripts/locateVerbatim.ts'

describe('locateVerbatim', () => {
  const text = 'So, uh, the Zorbex trial, um, worked in 2021.'

  it('returns verbatim spans unchanged', () => {
    expect(locateVerbatim(text, 'Zorbex trial')).toBe('Zorbex trial')
  })

  it('matches across punctuation the model left out', () => {
    expect(locateVerbatim(text, 'uh the Zorbex')).toBe('uh, the Zorbex')
  })

  it('keeps trailing punctuation only when the model wrote it', () => {
    expect(locateVerbatim(text, 'trial um,')).toBe('trial, um,')
    expect(locateVerbatim(text, 'trial um')).toBe('trial, um')
  })

  it('strips whole and partial uncertainty markup', () => {
    expect(locateVerbatim(text, '[[Zorbex|0.81]] trial')).toBe('Zorbex trial')
    expect(locateVerbatim(text, 'worked in|0.89 2021')).toBe('worked in 2021')
  })

  it('ignores case and returns undefined for absent text', () => {
    expect(locateVerbatim(text, 'THE ZORBEX')).toBe('the Zorbex')
    expect(locateVerbatim(text, 'absent words')).toBeUndefined()
    expect(locateVerbatim(text, '  ')).toBeUndefined()
  })
})
