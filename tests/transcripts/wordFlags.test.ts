import { describe, expect, it } from 'vitest'
import { flagWords } from '../../scripts/transcripts/flagWords.ts'
import { flagsFixture } from './flagsFixture.ts'
import { memoryEntryFixture } from './memoryEntryFixture.ts'
import { mergedWordFixture } from './mergedWordFixture.ts'

describe('word flags', () => {
  it('flags low-confidence words only in the low band', () => {
    expect(flagsFixture(['maybe'], 0.9)[0]).toContain('low-confidence')
    expect(flagsFixture(['maybe'], 0.95)[0]).not.toContain('low-confidence')
  })

  it('flags a capitalised word that is not sentence-initial as an entity', () => {
    const [first, second] = flagsFixture(['Yesterday', 'Zorbex'])
    expect(first).not.toContain('entity')
    expect(second).toContain('entity')
  })

  it('flags ALL CAPS words of two or more letters, even sentence-initial', () => {
    expect(flagsFixture(['NASA'])[0]).toContain('entity')
    expect(flagsFixture(['X'])[0]).not.toContain('entity')
  })

  it('does not flag the stoplist as entities', () => {
    const flags = flagsFixture(['so', 'I', "I'm", 'OK'])
    expect(flags.every((entry) => !entry.includes('entity'))).toBe(true)
  })

  it('flags words containing a digit as numbers', () => {
    expect(flagsFixture(['42'])[0]).toContain('number')
    expect(flagsFixture(['Q3,'])[0]).toContain('number')
    expect(flagsFixture(['three'])[0]).not.toContain('number')
  })

  it('flags fillers regardless of case and punctuation', () => {
    expect(flagsFixture(['Um,'])[0]).toContain('filler')
    expect(flagsFixture(['HMM'])[0]).toContain('filler')
    expect(flagsFixture(['umbrella'])[0]).not.toContain('filler')
  })

  it('flags a word equal to the previous one as a repetition', () => {
    const [first, second] = flagsFixture(['the', 'The,'])
    expect(first).not.toContain('repetition')
    expect(second).toContain('repetition')
  })

  it('flags the first word of a glossary phrase as a memory hit', () => {
    const words = ['we', 'bought', 'Acme', 'Corp,', 'today'].map((text) =>
      mergedWordFixture({ text }),
    )
    const flags = flagWords(words, [memoryEntryFixture()]).map(
      (word) => word.flags,
    )
    expect(flags[2]).toContain('memory')
    expect(flags[3]).not.toContain('memory')
    expect(flags[1]).not.toContain('memory')
  })

  it('flags a single-word glossary entry', () => {
    const words = [mergedWordFixture({ text: 'Zorbex.' })]
    const entry = memoryEntryFixture({ from: 'zorbex', to: 'Zorbex' })
    expect(flagWords(words, [entry])[0]?.flags).toContain('memory')
  })
})
