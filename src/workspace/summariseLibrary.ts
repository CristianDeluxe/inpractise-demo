import type { Library } from '@/contracts/Library'
import type { LibraryStats } from './LibraryStats'

/**
 * One missing passage count makes the corpus total unknown rather than smaller.
 * Reporting the sum of the counts that happen to be present would state an
 * incomplete corpus as an exact size, which is the one thing this demo may not
 * do with a number it puts on screen.
 */
export function summariseLibrary(
  library: Library,
  company: string,
): LibraryStats {
  const items = library.items.filter(
    (item) => !company || item.company === company,
  )
  const passages = items.reduce<number | undefined>(
    (total, item) =>
      total === undefined || item.passage_count === undefined
        ? undefined
        : total + item.passage_count,
    0,
  )
  const published = items.map((item) => item.published_at).toSorted()
  return {
    documents: items.length,
    filings: items.filter((item) => item.kind === 'sec_filing').length,
    interviews: items.filter((item) => item.kind === 'synthetic_interview')
      .length,
    companies: new Set(items.map((item) => item.company)).size,
    passages,
    latestPublished: published.at(-1),
  }
}
