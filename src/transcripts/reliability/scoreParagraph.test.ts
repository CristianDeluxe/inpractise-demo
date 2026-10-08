import { correctedParagraphFixture } from '@/transcripts/fixtures/correctedParagraphFixture'
import { editFixture } from '@/transcripts/fixtures/editFixture'
import { ledgerParagraphFixture } from '@/transcripts/fixtures/ledgerParagraphFixture'
import { toDecisionMap } from '@/transcripts/review/toDecisionMap'
import { describe, expect, it } from 'vitest'
import { scoreParagraph } from './scoreParagraph'
import { scoreRowsFixture } from './scoreRowsFixture'

describe('scoreParagraph', () => {
  it('keeps the ASR confidence of every word without a correction', () => {
    expect(
      scoreRowsFixture(
        scoreParagraph(ledgerParagraphFixture(), undefined, new Map()).words,
      ),
    ).toEqual([
      ['Revenue', 0.97],
      ['grew', 0.97],
      ['twelve', 0.7],
      ['percent', 0.97],
      ['at', 0.97],
      ['Northwynd', 0.31],
      ['Ledgar', 0.31],
      ['last', 0.97],
      ['year.', 0.97],
    ])
  })

  it('gives a word written by an auto-applied edit the edit confidence', () => {
    const edit = editFixture('e1', 'Northwynd', 'Northwind', {
      confidence: 0.85,
    })
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(scoreRowsFixture(words).slice(4, 7)).toEqual([
      ['at', 0.97],
      ['Northwind', 0.85],
      ['Ledgar', 0.31],
    ])
  })

  it('keeps the raw word and caps it at one minus the confidence for an uncertain edit', () => {
    const edit = editFixture('e1', 'at', 'in', { confidence: 0.6 })
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(scoreRowsFixture(words).slice(4, 5)).toEqual([['at', 0.4]])
  })

  it('does not penalise the words an uncertain edit would keep', () => {
    const edit = editFixture('e1', 'percent at', 'percent in', {
      confidence: 0.6,
    })
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(scoreRowsFixture(words).slice(3, 5)).toEqual([
      ['percent', 0.97],
      ['at', 0.4],
    ])
  })

  it('scores a word an edit only re-cases by its own ASR confidence', () => {
    const edit = editFixture('e1', 'twelve', 'Twelve', { confidence: 0.85 })
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(scoreRowsFixture(words).slice(2, 3)).toEqual([['Twelve', 0.7]])
  })

  it('drops the words of an applied removal', () => {
    const edit = editFixture('e1', 'grew', '', { confidence: 0.9 })
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(words.map((word) => word.text).slice(0, 3)).toEqual([
      'Revenue',
      'twelve',
      'percent',
    ])
  })

  it('treats an accepted edit as human-confirmed and a rejected one as raw and confirmed', () => {
    const edits = [
      editFixture('e1', 'Northwynd', 'Northwind', { confidence: 0.3 }),
      editFixture('e2', 'Ledgar', 'Ledger', { confidence: 0.99 }),
    ]
    const decisions = toDecisionMap([
      { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
      { editId: 'e2', verdict: 'rejected', decidedAt: 'now' },
    ])
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture(edits),
      decisions,
    ).words
    expect(scoreRowsFixture(words).slice(5, 7)).toEqual([
      ['Northwind', 1],
      ['Ledgar', 1],
    ])
  })

  it('replays an edit word from the audio of the raw word it replaced', () => {
    const edit = editFixture('e1', 'Northwynd', 'Northwind')
    const words = scoreParagraph(
      ledgerParagraphFixture(),
      correctedParagraphFixture([edit]),
      new Map(),
    ).words
    expect(words[5]?.start).toBe(2.5)
  })
})
