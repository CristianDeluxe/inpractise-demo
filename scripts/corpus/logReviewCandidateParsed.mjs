/**
 * Logs the per-document progress line shared by the SEC and annual-report
 * review-preparation scripts once a candidate has parsed successfully.
 */
export function logReviewCandidateParsed(entry, result) {
  console.log(
    `${entry.documentId}: parsed ${result.passageCount} passages (${result.totalTokens} tokens), pending owner review`,
  )
}
