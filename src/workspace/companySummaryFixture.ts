import type { CompanySummary } from './CompanySummary'

export function companySummaryFixture(
  overrides: Partial<CompanySummary> = {},
): CompanySummary {
  return {
    company: 'Northstar Workflow',
    interviews: 2,
    filings: 0,
    firstInterviewDate: '2026-03-01',
    lastInterviewDate: '2026-05-01',
    latestPublished: '2026-05-02T00:00:00Z',
    ...overrides,
  }
}
