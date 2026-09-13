import { citationFixture } from '@/api/citationFixture'
import { describe, expect, it } from 'vitest'
import { parseAskData } from './parseAskData'
import { parseDebugData } from './parseDebugData'
import { parseListData } from './parseListData'
import { parseMeData } from './parseMeData'
import { parseReadData } from './parseReadData'
import { parseSearchData } from './parseSearchData'

describe('source-backed action parsers', () => {
  it('rejects extra provider prose rather than stripping it', () => {
    const citation = citationFixture()
    const data = {
      status: 'answered',
      claims: [{ text: 'Claim', citationIds: [citation.citationId] }],
      citations: [citation],
      missingEvidence: [],
      mode: 'hybrid',
      candidateCount: 1,
    }
    expect(parseAskData(data).status).toBe('answered')
    expect(() =>
      parseAskData({ ...data, answer: 'Unreviewed provider prose' }),
    ).toThrow()
    expect(() =>
      parseAskData({
        ...data,
        claims: [{ text: 'Claim', citationIds: ['foreign'] }],
      }),
    ).toThrow()
    expect(() =>
      parseAskData({
        ...data,
        citations: [{ ...citation, readerPath: 'https://example.com' }],
      }),
    ).toThrow()
  })
  it.each(['answered', 'partial', 'conflict'] as const)(
    'preserves %s',
    (status) => {
      const citation = citationFixture()
      expect(
        parseAskData({
          status,
          claims: [{ text: 'Claim', citationIds: [citation.citationId] }],
          citations: [citation],
          missingEvidence: ['Limits'],
          mode: 'lexical_only',
          candidateCount: 2,
        }).status,
      ).toBe(status)
    },
  )
  it('accepts only claim-free not_found', () => {
    expect(
      parseAskData({
        status: 'not_found',
        claims: [],
        citations: [],
        missingEvidence: [],
        mode: 'hybrid',
        candidateCount: 0,
      }).status,
    ).toBe('not_found')
    expect(() =>
      parseAskData({
        status: 'not_found',
        claims: [{ text: 'Claim', citationIds: ['foreign'] }],
        citations: [],
        missingEvidence: [],
        mode: 'hybrid',
        candidateCount: 0,
      }),
    ).toThrow()
  })
  it('enforces the documented list bound without slicing', () => {
    const item = {
      document_id: 's1',
      revision_id: 'r1',
      title: 'Title',
      company: 'demo',
      kind: 'synthetic_interview',
      origin: 'synthetic',
      interview_date: null,
      published_at: '2026-09-13',
      source_url: null,
    }
    expect(parseListData({ items: [item] }).items).toHaveLength(1)
    expect(() =>
      parseListData({ items: Array.from({ length: 11 }, () => item) }),
    ).toThrow()
    expect(() =>
      parseListData({ items: [{ ...item, summary: 'Invented' }] }),
    ).toThrow()
  })
  it('validates membership and unavailable diagnostics', () => {
    expect(
      parseMeData({ orgId: 'org', role: 'member', premium: false }).premium,
    ).toBe(false)
    expect(() =>
      parseMeData({ orgId: 'org', role: 'admin', premium: true }),
    ).toThrow()
    const corpus = {
      documents: 0,
      revisions: 0,
      passages: 0,
      vectors: 0,
      report: null,
      diagnosis: 'unclassified',
    }
    expect(parseDebugData({ corpus }).corpus.report).toBeNull()
    expect(() =>
      parseDebugData({ corpus: { ...corpus, report: { passed: 100 } } }),
    ).toThrow()
  })
  it('validates exact passages and bounded ranked search', () => {
    const citation = citationFixture()
    expect(
      parseReadData({
        citation,
        section: 'Interview',
        isCurrentRevision: false,
        neighbourIds: ['P3'],
      }).isCurrentRevision,
    ).toBe(false)
    expect(() =>
      parseReadData({
        citation: { ...citation, quote: '' },
        section: 'Interview',
        isCurrentRevision: true,
        neighbourIds: [],
      }),
    ).toThrow()
    expect(
      parseSearchData({ items: [citation], mode: 'hybrid', truncated: true })
        .truncated,
    ).toBe(true)
    expect(() =>
      parseSearchData({
        items: [citation],
        mode: 'invented',
        truncated: false,
      }),
    ).toThrow()
  })
})
