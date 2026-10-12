import { describe, expect, it } from 'vitest'
import { attachVerdicts } from '../../scripts/transcripts/attachVerdicts.ts'
import { countedEdits } from '../../scripts/transcripts/countedEdits.ts'
import { isLearnableEdit } from '../../scripts/transcripts/isLearnableEdit.ts'
import { learnExamples } from '../../scripts/transcripts/learnExamples.ts'
import { learnGlossary } from '../../scripts/transcripts/learnGlossary.ts'
import { upsertGlossaryEntry } from '../../scripts/transcripts/upsertGlossaryEntry.ts'
import { memoryEntryFixture } from './memoryEntryFixture.ts'
import { reviewDecisionFixture } from './reviewDecisionFixture.ts'
import { reviewEditFixture } from './reviewEditFixture.ts'
import { reviewRunFixture } from './reviewRunFixture.ts'

describe('glossary learning', () => {
  const run = reviewRunFixture()

  it('upserts a new entry then increments occurrences and sources', () => {
    const first = upsertGlossaryEntry(
      [],
      reviewEditFixture('a', 'Zorbex', 'Zorbecks'),
      { transcriptId: 'demo0001', seenAt: 'T1', basis: 'human' },
    )
    const second = upsertGlossaryEntry(
      first,
      reviewEditFixture('a', 'Zorbex', 'Zorbecks'),
      { transcriptId: 'demo0002', seenAt: 'T2', basis: 'human' },
    )
    expect(second).toHaveLength(1)
    expect(second[0]).toMatchObject({
      occurrences: 2,
      sources: ['demo0001', 'demo0002'],
      lastSeenAt: 'T2',
    })
  })

  it('counts a source once when the same learn is repeated', () => {
    const entries = upsertGlossaryEntry(
      [
        memoryEntryFixture({
          from: 'Zorbex',
          to: 'Zorbecks',
          sources: ['demo0001'],
        }),
      ],
      reviewEditFixture('a', 'Zorbex', 'Zorbecks'),
      { transcriptId: 'demo0001', seenAt: 'T', basis: 'human' },
    )
    expect(entries[0]?.sources).toEqual(['demo0001'])
    expect(entries[0]?.occurrences).toBe(1)
  })

  it('restarts an entry whose replacement changed', () => {
    const entries = upsertGlossaryEntry(
      [memoryEntryFixture({ from: 'Zorbex', to: 'Old', occurrences: 5 })],
      reviewEditFixture('a', 'Zorbex', 'Zorbecks'),
      { transcriptId: 'demo0003', seenAt: 'T', basis: 'human' },
    )
    expect(entries[0]).toMatchObject({
      to: 'Zorbecks',
      occurrences: 1,
      sources: ['demo0003'],
    })
  })

  it('keeps a reference-confirmed entry until a person vouches for it', () => {
    const edit = reviewEditFixture('a', 'Zorbex', 'Zorbecks')
    const machine = upsertGlossaryEntry([], edit, {
      transcriptId: 'demo0001',
      seenAt: 'T1',
      basis: 'references',
    })
    expect(machine[0]?.basis).toBe('references')
    const human = upsertGlossaryEntry(machine, edit, {
      transcriptId: 'demo0002',
      seenAt: 'T2',
      basis: 'human',
    })
    expect(human[0]?.basis).toBe('human')
    const again = upsertGlossaryEntry(human, edit, {
      transcriptId: 'demo0003',
      seenAt: 'T3',
      basis: 'references',
    })
    expect(again[0]?.basis).toBe('human')
  })

  it('learns only entity, term and number edits of one to three words that change', () => {
    const reviewed = (
      from: string,
      to: string,
      category: 'entity' | 'grammar',
    ) => ({
      ...reviewEditFixture('p-e1', from, to, category),
      verdict: 'accepted' as const,
    })
    expect(isLearnableEdit(reviewed('a b c', 'x', 'entity'))).toBe(true)
    expect(isLearnableEdit(reviewed('a b c d', 'x', 'entity'))).toBe(false)
    expect(isLearnableEdit(reviewed('a', 'x', 'grammar'))).toBe(false)
    expect(isLearnableEdit(reviewed('a', 'a', 'entity'))).toBe(false)
  })

  it('counts accepted edits, and pending ones only on request', () => {
    const edits = attachVerdicts(run, [
      reviewDecisionFixture('p1-e1', 'accepted'),
      reviewDecisionFixture('p2-e1', 'rejected'),
    ])
    expect(countedEdits(edits, false).map((item) => item.id)).toEqual(['p1-e1'])
    expect(countedEdits(edits, true).map((item) => item.id)).toEqual([
      'p1-e1',
      'p1-e2',
    ])
  })

  it('uses the latest decision for an edit', () => {
    const edits = attachVerdicts(run, [
      {
        ...reviewDecisionFixture('p1-e1', 'rejected'),
        decidedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        ...reviewDecisionFixture('p1-e1', 'accepted'),
        decidedAt: '2026-01-02T00:00:00.000Z',
      },
    ])
    expect(edits.find((item) => item.id === 'p1-e1')?.verdict).toBe('accepted')
  })

  it('ignores punctuation shared by both sides when learning', () => {
    const counted = countedEdits(
      attachVerdicts(run, [reviewDecisionFixture('p1-e1', 'accepted')]),
      false,
    )
    const glossary = learnGlossary([], counted, {
      transcriptId: 'demo0002',
      seenAt: 'T',
      basis: 'human',
    })
    expect(glossary.map((entry) => [entry.from, entry.to])).toEqual([
      ['Zorbex', 'Zorbecks'],
    ])
  })

  it('learns examples only for fully counted paragraphs, rebuilt from raw, once', () => {
    const edits = attachVerdicts(run, [
      reviewDecisionFixture('p1-e1', 'accepted'),
      reviewDecisionFixture('p2-e1', 'accepted'),
      reviewDecisionFixture('p2-e2', 'rejected'),
    ])
    const input = {
      transcriptId: 'demo0002',
      run,
      rawByParagraph: new Map([
        ['p1', 'Zorbex, grue'],
        ['p2', 'Quill on rose'],
      ]),
      edits,
      counted: countedEdits(edits, false),
      existing: [],
    }
    const learned = learnExamples(input)
    expect(learned).toEqual([
      {
        transcriptId: 'demo0002',
        paragraphId: 'p2',
        raw: 'Quill on rose',
        corrected: 'Quillon rose',
      },
    ])
    expect(learnExamples({ ...input, existing: learned })).toEqual([])
    const everything = countedEdits(edits, true)
    expect(
      learnExamples({ ...input, counted: everything }).map(
        (item) => item.corrected,
      ),
    ).toEqual(['Zorbecks, grew', 'Quillon rose'])
  })

  it('skips an example when one of its edits was rejected', () => {
    const rejectedRun = {
      ...run,
      paragraphs: [
        {
          paragraphId: 'p1',
          text: 't',
          edits: [
            reviewEditFixture('p1-e1', 'a', 'b'),
            reviewEditFixture('p1-e2', 'c', 'd'),
          ],
        },
      ],
    }
    const edits = attachVerdicts(rejectedRun, [
      reviewDecisionFixture('p1-e1', 'accepted'),
      reviewDecisionFixture('p1-e2', 'rejected'),
    ])
    const learned = learnExamples({
      transcriptId: 'demo0002',
      run: rejectedRun,
      rawByParagraph: new Map([['p1', 'raw']]),
      edits,
      counted: countedEdits(edits, false),
      existing: [],
    })
    expect(learned).toEqual([])
  })
})
