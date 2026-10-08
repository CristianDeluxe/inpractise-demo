import { describe, expect, it } from 'vitest'
import { prepareParagraph } from '../../scripts/transcripts/prepareParagraph.ts'
import { memoryEntryFixture } from './memoryEntryFixture.ts'
import { paragraphFixture } from './paragraphFixture.ts'

describe('memory pre-pass', () => {
  it('substitutes whole words, case-sensitively', () => {
    const entry = memoryEntryFixture({ from: 'Zorbex', to: 'Zorbecks' })
    const prepared = prepareParagraph(
      paragraphFixture(['Zorbex', 'zorbex', 'Zorbexes', 'and', 'Zorbex,']),
      [entry],
    )
    expect(prepared.text).toBe('Zorbecks zorbex Zorbexes and Zorbecks,')
    expect(prepared.raw).toBe('Zorbex zorbex Zorbexes and Zorbex,')
  })

  it('emits one memory edit per entry, at every match, with confidence 1 and the sources as reason', () => {
    const entry = memoryEntryFixture({
      from: 'Zorbex',
      to: 'Zorbecks',
      sources: ['aaa', 'bbb'],
    })
    const prepared = prepareParagraph(paragraphFixture(['Zorbex', 'Zorbex']), [
      entry,
    ])
    expect(prepared.memoryEdits).toEqual([
      {
        paragraphId: 'p0001',
        from: 'Zorbex',
        to: 'Zorbecks',
        category: 'entity',
        origin: 'memory',
        reason: 'Learned from aaa, bbb',
        confidence: 1,
        at: [0, 7],
      },
    ])
  })

  it('prefers the longer phrase when entries overlap', () => {
    const entries = [
      memoryEntryFixture({ from: 'Acme', to: 'ACME' }),
      memoryEntryFixture({ from: 'Acme Corp', to: 'ACME Corporation' }),
    ]
    const prepared = prepareParagraph(
      paragraphFixture(['Acme', 'Corp', 'grew']),
      entries,
    )
    expect(prepared.text).toBe('ACME Corporation grew')
    expect(prepared.memoryEdits).toHaveLength(1)
  })

  it('leaves text alone when nothing matches', () => {
    const prepared = prepareParagraph(paragraphFixture(['plain', 'text']), [
      memoryEntryFixture(),
    ])
    expect(prepared.text).toBe('plain text')
    expect(prepared.memoryEdits).toEqual([])
  })

  it('marks low-confidence words inline with their confidence', () => {
    const prepared = prepareParagraph(
      paragraphFixture(['the', 'Sober', 'fund'], 1),
      [],
    )
    expect(prepared.marked).toBe('the [[Sober|0.81]] fund')
  })

  it('does not mark a word that a glossary entry already replaced', () => {
    const entry = memoryEntryFixture({ from: 'Sober', to: 'Sovereign' })
    const prepared = prepareParagraph(
      paragraphFixture(['the', 'Sober', 'fund'], 1),
      [entry],
    )
    expect(prepared.marked).toBe('the Sovereign fund')
  })
})
