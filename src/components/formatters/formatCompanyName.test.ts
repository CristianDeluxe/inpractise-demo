import { describe, expect, it } from 'vitest'
import { formatCompanyName } from './formatCompanyName'

describe('formatCompanyName', () => {
  it('turns a slug into a readable name', () => {
    expect(formatCompanyName('harbor-components')).toBe('Harbor Components')
    expect(formatCompanyName('microsoft')).toBe('Microsoft')
  })
  it('leaves a name that is not a slug alone apart from its capitals', () => {
    expect(formatCompanyName('Premium Company')).toBe('Premium Company')
    expect(formatCompanyName('')).toBe('')
  })
})
