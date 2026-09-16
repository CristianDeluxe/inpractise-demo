/**
 * Records one failed parse attempt into the review report and the
 * human-readable review markdown, shared by the SEC and annual-report
 * review-preparation scripts.
 */
export function recordReviewParseFailure(report, lines, entry, error) {
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
}
