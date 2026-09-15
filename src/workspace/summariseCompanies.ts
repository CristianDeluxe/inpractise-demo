import type { Library } from '@/contracts/Library'
import type { CompanySummary } from './CompanySummary'

/**
 * One summary per company in the authorized list, in name order. Counts and
 * dates come from the rows the database returned; a company absent from the
 * list is absent here, not shown as empty.
 */
export function summariseCompanies(library: Library): CompanySummary[] {
  const groups = new Map<string, CompanySummary>()
  for (const document of library.items) {
    const group = groups.get(document.company) ?? {
      company: document.company,
      interviews: 0,
      filings: 0,
      firstInterviewDate: undefined,
      lastInterviewDate: undefined,
      latestPublished: document.published_at,
    }
    if (document.kind === 'synthetic_interview') group.interviews += 1
    else group.filings += 1
    const date = document.interview_date
    if (date !== null) {
      if (
        group.firstInterviewDate === undefined ||
        date < group.firstInterviewDate
      )
        group.firstInterviewDate = date
      if (
        group.lastInterviewDate === undefined ||
        date > group.lastInterviewDate
      )
        group.lastInterviewDate = date
    }
    if (document.published_at > group.latestPublished)
      group.latestPublished = document.published_at
    groups.set(document.company, group)
  }
  return [...groups.values()].sort((a, b) => a.company.localeCompare(b.company))
}
