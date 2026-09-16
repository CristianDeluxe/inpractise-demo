export function appendAnnualReportReviewLines(lines, entry, result) {
  lines.push(
    `## ${entry.documentId}`,
    '',
    `[Original report](${entry.sourceUrl})`,
    '',
    `Raw SHA-256: ${entry.rawSha256}`,
    '',
    `Candidate revision: ${result.revisionId}`,
    '',
    `${result.passageCount} passages; ${result.totalTokens} tokens.`,
    '',
  )
  for (const section of result.coverage.sections)
    lines.push(
      `### ${section.section}`,
      '',
      `Pages ${section.startPage} to ${section.endPage}.`,
      '',
      `First: ${section.firstParagraph}`,
      '',
      `Last: ${section.lastParagraph}`,
      '',
    )
}
