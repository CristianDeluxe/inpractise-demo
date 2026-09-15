import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import type { CompanySummary } from './CompanySummary'

/** The interview date, or the first and last of a range, that a company's rows carry. */
export function describeInterviewDates(
  summary: CompanySummary,
): string[] | undefined {
  if (
    summary.firstInterviewDate === undefined ||
    summary.lastInterviewDate === undefined
  )
    return undefined
  const first = formatPublishedDate(summary.firstInterviewDate)
  const last = formatPublishedDate(summary.lastInterviewDate)
  return first === last ? [first] : [first, last]
}
