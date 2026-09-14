import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { corpusManifestDocuments } from '../helpers/corpusManifestDocuments.ts'
import { parseDemoCorpusStats } from '../helpers/parseDemoCorpusStats.ts'

describe('landing page corpus figures', () => {
  const documents = corpusManifestDocuments()
  const shown = parseDemoCorpusStats(
    readFileSync('src/public/demoCorpusStats.ts', 'utf8'),
  )

  it('counts the synthetic interviews the manifest accepts', () => {
    const interviews = documents.filter(
      (document) => document.kind === 'synthetic_interview',
    )
    expect(shown.get('Synthetic interviews')).toBe(String(interviews.length))
  })

  it('counts the public filings the manifest accepts', () => {
    const filings = documents.filter(
      (document) => document.kind === 'sec_filing',
    )
    expect(shown.get('Public filings')).toBe(String(filings.length))
  })

  it('sums the passages the corpus actually indexes', () => {
    const passages = documents.reduce(
      (total, document) => total + document.passageCount,
      0,
    )
    expect(shown.get('Indexed passages')).toBe(String(passages))
  })

  it('counts the distinct companies the corpus covers', () => {
    const companies = new Set(documents.map((document) => document.company))
    expect(shown.get('Companies covered')).toBe(String(companies.size))
  })
})
