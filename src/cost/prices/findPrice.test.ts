import { describe, expect, it } from 'vitest'
import { findPrice } from './findPrice'

describe('findPrice', () => {
  it('matches a base id and its dated snapshot', () => {
    expect(findPrice('gpt-4.1-mini')?.inputUsdPerMillion).toBe(0.4)
    expect(findPrice('gpt-4.1-mini-2025-04-14')?.outputUsdPerMillion).toBe(1.6)
    expect(findPrice('gpt-4.1-nano-2025-04-14')?.inputUsdPerMillion).toBe(0.1)
    expect(findPrice('text-embedding-3-small')?.inputUsdPerMillion).toBe(0.02)
    expect(findPrice('claude-sonnet-5')).toBeUndefined()
  })
  it('does not guess a price for a different model that shares a prefix', () => {
    expect(findPrice('gpt-4.1-mini-experimental')).toBeUndefined()
    expect(findPrice('gpt-4.1')).toBeUndefined()
    expect(findPrice(null)).toBeUndefined()
  })
})
