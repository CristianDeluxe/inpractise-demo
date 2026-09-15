import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import type { CompanySummary } from './CompanySummary'

/** One line for a company's synthetic interviews, or nothing when it has none. */
export function describeInterviews(
  summary: CompanySummary,
): string | undefined {
  if (summary.interviews === 0) return undefined
  const noun = summary.interviews === 1 ? 'interview' : 'interviews'
  const count = `${String(summary.interviews)} synthetic ${noun}`
  if (
    summary.firstInterviewDate === undefined ||
    summary.lastInterviewDate === undefined
  )
    return count
  const first = formatPublishedDate(summary.firstInterviewDate)
  const last = formatPublishedDate(summary.lastInterviewDate)
  return first === last
    ? `${count}, dated ${first}`
    : `${count}, dated ${first} to ${last}`
}
