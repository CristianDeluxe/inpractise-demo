import { describe, expect, it } from 'vitest'
import { diffWords } from './diffWords'
import { splitTokens } from './splitTokens'

describe('diffWords', () => {
  it('marks nothing when the texts match after normalisation', () => {
    const diff = diffWords(
      splitTokens('Hello, World'),
      splitTokens('hello world'),
    )
    expect(diff.rawChanged).toEqual([false, false])
    expect(diff.correctedChanged).toEqual([false, false])
  })

  it('marks a substitution on both sides', () => {
    const diff = diffWords(
      splitTokens('we hired fourty people'),
      splitTokens('we hired forty people'),
    )
    expect(diff.rawChanged).toEqual([false, false, true, false])
    expect(diff.correctedChanged).toEqual([false, false, true, false])
  })

  it('marks pure insertions and deletions on one side only', () => {
    const inserted = diffWords(['a', 'c'], ['a', 'b', 'c'])
    expect(inserted.rawChanged).toEqual([false, false])
    expect(inserted.correctedChanged).toEqual([false, true, false])
    const deleted = diffWords(['a', 'um', 'c'], ['a', 'c'])
    expect(deleted.rawChanged).toEqual([false, true, false])
    expect(deleted.correctedChanged).toEqual([false, false])
  })

  it('handles empty inputs', () => {
    expect(diffWords([], ['a']).correctedChanged).toEqual([true])
    expect(diffWords(['a'], []).rawChanged).toEqual([true])
  })
})
