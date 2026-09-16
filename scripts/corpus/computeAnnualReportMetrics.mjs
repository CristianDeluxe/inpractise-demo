import { parserVersion } from './parserVersion.mjs'

/**
 * The throughput record for one annual-report parse: pages scanned for
 * titles, pages actually read for narrative, blocks kept, and timing -
 * the numbers ingestion-metrics.json and the /inspect page surface.
 */
export function computeAnnualReportMetrics({
  pages,
  boundaries,
  turns,
  scanned,
  started,
}) {
  const pagesRead = pages.filter((page) =>
    boundaries.some(
      (boundary) =>
        page.pageNumber >= boundary.startPage &&
        page.pageNumber < boundary.endPage,
    ),
  ).length
  return {
    pagesScanned: scanned,
    pagesRead,
    blocks: turns.length,
    parseMs: Math.round(performance.now() - started),
    parserVersion,
  }
}
