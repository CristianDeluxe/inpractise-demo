import { writeFile } from 'node:fs/promises'
import { ANNUAL_REPORT_REVIEW_INTRO } from './annualReportReviewIntro.mjs'
import { appendAnnualReportReviewLines } from './appendAnnualReportReviewLines.mjs'
import { readJson } from './readJson.mjs'
import { reviewOneAnnualReport } from './reviewOneAnnualReport.mjs'
import { writeJson } from './writeJson.mjs'

/**
 * Parses every acquired annual-report PDF into a candidate normalised
 * document pending owner review, the PDF-intake analogue of
 * prepareReview.mjs for SEC filings.
 */
export async function prepareAnnualReportReview(root) {
  const acquisition = await readJson(
    `${root}/corpus/acquisition-annual-reports.json`,
  )
  const report = { documents: [] }
  const lines = [...ANNUAL_REPORT_REVIEW_INTRO]
  let failed = false
  for (const entry of acquisition.documents) {
    if (entry.status !== 'acquired_pending_review') continue
    try {
      const result = await reviewOneAnnualReport(root, entry)
      report.documents.push(result)
      appendAnnualReportReviewLines(lines, entry, result)
      console.log(
        `${entry.documentId}: parsed ${result.passageCount} passages (${result.totalTokens} tokens), pending owner review`,
      )
    } catch (error) {
      report.documents.push({
        ...entry,
        status: 'parse_failed',
        error: error.message,
      })
      lines.push(
        `## ${entry.documentId}`,
        '',
        `Parsing failed: ${error.message}`,
        '',
      )
      failed = true
    }
  }
  await writeJson(`${root}/corpus/review/annual-reports.json`, report)
  await writeFile(
    `${root}/corpus/review/ANNUAL_REPORT_REVIEW.md`,
    lines.join('\n'),
  )
  return { report, failed }
}
