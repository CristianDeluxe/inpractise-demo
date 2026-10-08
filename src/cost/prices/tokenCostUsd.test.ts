import { describe, expect, it } from 'vitest'
import { gpt41MiniPrice } from './gpt41MiniPrice'
import { tokenCostUsd } from './tokenCostUsd'

describe('tokenCostUsd', () => {
  it('prices input and output tokens per million', () => {
    expect(tokenCostUsd(gpt41MiniPrice, 1_000_000, 1_000_000)).toBeCloseTo(
      2,
      10,
    )
  })
  it('is undefined without a confirmed price', () => {
    expect(tokenCostUsd(undefined, 10, 10)).toBeUndefined()
  })
})
