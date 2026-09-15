import { describe, expect, it } from 'vitest'
import { companyDocumentFixture } from './companyDocumentFixture'
import { summariseCompanies } from './summariseCompanies'

describe('summariseCompanies', () => {
  it('returns nothing for an empty authorized list', () => {
    expect(summariseCompanies({ items: [] })).toEqual([])
  })
  it('groups by company in name order, counting kinds and bounding dates', () => {
    const summaries = summariseCompanies({
      items: [
        companyDocumentFixture({
          document_id: 'late',
          interview_date: '2026-05-01',
          published_at: '2026-05-02T00:00:00Z',
        }),
        companyDocumentFixture({
          document_id: 'early',
          interview_date: '2026-03-01',
          published_at: '2026-03-02T00:00:00Z',
        }),
        companyDocumentFixture({
          document_id: 'filing',
          company: 'Costco',
          kind: 'sec_filing',
          origin: 'public',
          interview_date: null,
          published_at: '2025-10-01T00:00:00Z',
        }),
      ],
    })
    expect(summaries).toEqual([
      {
        company: 'Costco',
        interviews: 0,
        filings: 1,
        firstInterviewDate: undefined,
        lastInterviewDate: undefined,
        latestPublished: '2025-10-01T00:00:00Z',
      },
      {
        company: 'Northstar Workflow',
        interviews: 2,
        filings: 0,
        firstInterviewDate: '2026-03-01',
        lastInterviewDate: '2026-05-01',
        latestPublished: '2026-05-02T00:00:00Z',
      },
    ])
  })
})
