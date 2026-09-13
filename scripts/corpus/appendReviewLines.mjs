export function appendReviewLines(lines, entry, result) {
  lines.push(
    `## ${entry.documentId}`,
    '',
    `[Original filing](${entry.sourceUrl})`,
    '',
    `Raw SHA-256: ${entry.rawSha256}`,
    '',
    `Candidate revision: ${result.revisionId}`,
    '',
    `${result.passageCount} passages; ${result.totalTokens} tokens. ${result.coverage.excludedTables} tables excluded across the full filing.`,
    '',
  )
  for (const section of result.coverage.sections)
    lines.push(
      `### ${section.section}`,
      '',
      `Start: ${section.startBoundary.text}; anchor: ${section.startBoundary.anchor ?? 'see original HTML offsets in the review JSON'}. End: ${section.endBoundary.text}.`,
      '',
      `First: ${section.firstParagraph}`,
      '',
      `Last: ${section.lastParagraph}`,
      '',
    )
}
