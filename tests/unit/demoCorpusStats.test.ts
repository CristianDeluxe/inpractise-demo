import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { corpusManifestDocuments } from '../helpers/corpusManifestDocuments.ts'
import { parseDemoCorpusStats } from '../helpers/parseDemoCorpusStats.ts'

describe('landing page corpus figures', () => {
  const documents = corpusManifestDocuments().filter(
    (document) => document.kind === 'public_interview',
  )
  const shown = parseDemoCorpusStats(
    readFileSync('src/public/demoCorpusStats.ts', 'utf8'),
  )

  it('counts the public podcast interviews readers can search', () => {
    expect(shown.get('Public podcast interviews')).toBe(
      String(documents.length),
    )
  })

  it('sums the minutes of audio the interviews cover', () => {
    const seconds = documents.reduce(
      (total, document) => total + (document.durationSeconds ?? 0),
      0,
    )
    expect(shown.get('Minutes of audio')).toBe(String(Math.round(seconds / 60)))
  })

  it('sums the passages readers can search', () => {
    const passages = documents.reduce(
      (total, document) => total + document.passageCount,
      0,
    )
    expect(shown.get('Transcript excerpts')).toBe(String(passages))
  })

  it('counts the distinct companies the interviews cover', () => {
    const companies = new Set(documents.map((document) => document.company))
    expect(shown.get('Companies covered')).toBe(String(companies.size))
  })
})
