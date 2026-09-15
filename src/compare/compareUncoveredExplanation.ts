import type { CompareSideName } from './CompareSideName'

/** Filings are absent from the corpus for every company but Microsoft and
 *  Costco, so a fictional company is an expected, not a surprising, gap. */
export function compareUncoveredExplanation(side: CompareSideName): string {
  return side === 'filings'
    ? 'This is expected for a fictional company: only Microsoft and Costco have SEC filings in this corpus.'
    : 'No interview passages were retrieved for this company.'
}
