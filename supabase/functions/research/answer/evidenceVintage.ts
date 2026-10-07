import type { CitationSource } from '../citations/CitationSource.ts'
import type { VintageSpan } from './VintageSpan.ts'

/**
 * Interviews age. An answer whose evidence is two years old can be correct in
 * every citation and still mislead, so the span is computed from the passages
 * actually selected and travels with the answer. Interview date first, falling
 * back to publication for filings that have none.
 */
export function evidenceVintage(
  sources: readonly CitationSource[],
  now: Date,
): VintageSpan | undefined {
  const dayMs = 86_400_000
  const dates = sources
    .map((source) => (source.interviewDate ?? source.publishedAt).slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort()
  const oldest = dates[0]
  const newest = dates.at(-1)
  if (oldest === undefined || newest === undefined) return undefined
  const ageDays = (value: string) =>
    Math.max(
      0,
      Math.floor((now.getTime() - Date.parse(`${value}T00:00:00Z`)) / dayMs),
    )
  return {
    oldest,
    newest,
    oldestAgeDays: ageDays(oldest),
    newestAgeDays: ageDays(newest),
  }
}
