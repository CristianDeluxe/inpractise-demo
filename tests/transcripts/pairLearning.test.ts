import { mkdirSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { analyzePair } from '../../scripts/transcripts/analyzePair.ts'
import { classifyHunk } from '../../scripts/transcripts/classifyHunk.ts'
import { isLearnableHunk } from '../../scripts/transcripts/isLearnableHunk.ts'
import { pairExamples } from '../../scripts/transcripts/pairExamples.ts'
import { readGlossary } from '../../scripts/transcripts/readGlossary.ts'
import { runPairs } from '../../scripts/transcripts/runPairs.ts'

describe('pair learning', () => {
  const original = process.cwd()
  let dir = ''

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'pairs-'))
    process.chdir(dir)
    mkdirSync('pairs')
    const raw = 'um so Zorbex grew in fourty days\n\nthe quill on rose'
    writeFileSync('pairs/a.raw.txt', raw)
    writeFileSync('pairs/b.raw.txt', raw)
    writeFileSync(
      'pairs/a.final.txt',
      'so Zorbecks grew in 40 days\n\nthe Quillon rose',
    )
    writeFileSync(
      'pairs/b.final.txt',
      'so Zorbecks grew in fourty days\n\nthe quill on rose',
    )
  })

  afterEach(() => {
    process.chdir(original)
  })

  it('classifies hunks', () => {
    expect(classifyHunk({ from: 'um', to: '' })).toBeNull()
    expect(classifyHunk({ from: 'Foo,', to: 'foo' })).toBeNull()
    expect(classifyHunk({ from: 'fourty', to: '40' })).toBe('number')
    expect(classifyHunk({ from: 'Zorbex', to: 'Zorbecks' })).toBe('entity')
    expect(classifyHunk({ from: 'quill on', to: 'Quillon' })).toBe('entity')
    expect(classifyHunk({ from: 'grue', to: 'grew' })).toBe('term')
  })

  it('treats only one to three word replacements as learnable', () => {
    expect(isLearnableHunk({ from: 'a', to: '', category: 'term' })).toBe(false)
    expect(isLearnableHunk({ from: '', to: 'a', category: 'term' })).toBe(false)
    expect(
      isLearnableHunk({ from: 'a', to: 'b c d e', category: 'term' }),
    ).toBe(false)
    expect(isLearnableHunk({ from: 'a', to: 'b', category: 'term' })).toBe(true)
  })

  it('reports WER and hunks for a pair', () => {
    const analysis = analyzePair({
      name: 'a',
      raw: 'um so Zorbex grew in fourty days',
      final: 'so Zorbecks grew in 40 days',
    })
    expect(analysis.hunks).toHaveLength(3)
    expect(analysis.classified).toHaveLength(2)
    expect(analysis.wer).toBeCloseTo(3 / 6)
  })

  it('writes only hunks seen at least the minimum number of times', () => {
    const report = runPairs({ dir: 'pairs', minOccurrences: 2, dryRun: false })
    expect(report.entriesWritten).toBe(1)
    expect(readGlossary().map((entry) => [entry.from, entry.to])).toEqual([
      ['Zorbex', 'Zorbecks'],
    ])
    expect(readGlossary()[0]?.sources).toEqual(['pair:a', 'pair:b'])
  })

  it('writes everything at a minimum of one, and nothing twice', () => {
    runPairs({ dir: 'pairs', minOccurrences: 1, dryRun: false })
    const first = readGlossary()
    expect(first).toHaveLength(3)
    runPairs({ dir: 'pairs', minOccurrences: 1, dryRun: false })
    expect(readGlossary().map((entry) => entry.occurrences)).toEqual(
      first.map((entry) => entry.occurrences),
    )
  })

  it('builds examples per aligned paragraph and skips known ones', () => {
    const pair = {
      name: 'a',
      raw: 'um Zorbex grew\n\nplain text',
      final: 'Zorbecks grew\n\nplain text',
    }
    const examples = pairExamples(pair, [])
    expect(examples).toEqual([
      {
        transcriptId: 'pair:a',
        paragraphId: 'p0',
        raw: 'um Zorbex grew',
        corrected: 'Zorbecks grew',
      },
    ])
    expect(pairExamples(pair, examples)).toEqual([])
    expect(pairExamples({ ...pair, final: 'Zorbecks grew' }, [])).toEqual([])
  })

  it('writes nothing on a dry run', () => {
    const report = runPairs({ dir: 'pairs', minOccurrences: 1, dryRun: true })
    expect(report.entriesWritten).toBeGreaterThan(0)
    expect(report.examplesWritten).toBeGreaterThan(0)
    expect(readdirSync('.')).toEqual(['pairs'])
  })
})
