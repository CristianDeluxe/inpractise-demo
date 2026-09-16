import { getDocumentProxy, getMeta } from 'unpdf'
import { annualReportExclusions } from './annualReportExclusions.mjs'
import { ANNUAL_REPORT_SCAN_PAGE_LIMIT } from './annualReportScanPageLimit.mjs'
import { ANNUAL_REPORT_SECTIONS } from './annualReportSections.mjs'
import { computeAnnualReportMetrics } from './computeAnnualReportMetrics.mjs'
import { locateAnnualReportSections } from './locateAnnualReportSections.mjs'
import { locatePdfTitles } from './locatePdfTitles.mjs'
import { pdfDateToIso } from './pdfDateToIso.mjs'
import { readAnnualReportSection } from './readAnnualReportSection.mjs'
import { readPdfPages } from './readPdfPages.mjs'

/**
 * Extracts the strategic-report narrative that corresponds to the SEC
 * Item 1 / 1A scope (business model, principal risks) from an annual
 * report PDF: locate the two section titles by font and position, read
 * only the pages between each title and the next one, and drop page
 * furniture, legends and stat callouts along the way. Deterministic given
 * the same bytes, so a verifier can replay it byte-for-byte.
 */
export async function parseAnnualReportNarrative(bytes) {
  const started = performance.now()
  const pdf = await getDocumentProxy(new Uint8Array(bytes), { verbosity: 0 })
  const meta = await getMeta(pdf)
  const scanned = Math.min(ANNUAL_REPORT_SCAN_PAGE_LIMIT, pdf.numPages)
  const pages = await readPdfPages(pdf, 1, scanned)
  const titles = locatePdfTitles(pages)
  const boundaries = locateAnnualReportSections(titles, ANNUAL_REPORT_SECTIONS)
  const turns = []
  const sections = []
  for (const boundary of boundaries) {
    const read = readAnnualReportSection(pages, boundary)
    turns.push(...read.turns)
    sections.push(read.coverage)
  }
  return {
    turns,
    creationDate: pdfDateToIso(meta.info?.CreationDate),
    coverage: {
      sections,
      excluded: annualReportExclusions,
      boundaryReview: 'pending_owner',
    },
    metrics: computeAnnualReportMetrics({
      pages,
      boundaries,
      turns,
      scanned,
      started,
    }),
  }
}
