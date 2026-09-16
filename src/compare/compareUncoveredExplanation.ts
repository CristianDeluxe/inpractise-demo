import type { CompareSideName } from './CompareSideName'

/** Filings are absent from the corpus for every company but Microsoft and
 *  Costco, so a fictional company is an expected, not a surprising, gap. With
 *  no company scope the same absence spans the whole corpus, not one company. */
export function compareUncoveredExplanation(
  side: CompareSideName,
  company?: string,
): string {
  if (side === 'filings')
    return company
      ? 'This is expected for a fictional company: only Microsoft and Costco have SEC filings in this corpus.'
      : 'Only Microsoft and Costco have SEC filings in this corpus, and neither matched this topic.'
  return company
    ? 'No interview passages were retrieved for this company.'
    : 'No interview passages were retrieved for this topic.'
}
