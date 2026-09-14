import type { Library } from '@/contracts/Library'
import type { CompanyCoverage } from './CompanyCoverage'

/**
 * One missing document count makes its entire company total unknown.
 * Summing only the available counts would present incomplete coverage as an exact
 * figure; retain `undefined` so charts can disclose the missing measurement.
 */
export function aggregateCompanyCoverage(
  library: Library,
  company: string,
): CompanyCoverage[] {
  const groups = new Map<string, CompanyCoverage>()
  for (const document of library.items) {
    if (company && document.company !== company) continue
    const group = groups.get(document.company) ?? {
      company: document.company,
      interviews: 0,
      passages: 0,
    }
    if (document.kind === 'synthetic_interview') group.interviews += 1
    group.passages =
      group.passages === undefined || document.passage_count === undefined
        ? undefined
        : group.passages + document.passage_count
    groups.set(document.company, group)
  }
  return [...groups.values()].sort((a, b) => a.company.localeCompare(b.company))
}
