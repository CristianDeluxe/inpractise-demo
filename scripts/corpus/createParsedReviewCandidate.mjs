/**
 * Builds the parsed-pending-review record shape shared by the SEC and
 * annual-report review scripts, once a candidate document has been
 * normalised and written to corpus/review/<id>.json.
 */
export function createParsedReviewCandidate({
  entry,
  document,
  normalised,
  normalisedPath,
  normalisedSha256,
  coverage,
  rightsBasis,
  rightsPolicyUrl,
  extra = {},
}) {
  return {
    ...entry,
    origin: 'public',
    sourceType: 'public_filing',
    synthetic: false,
    fictional: false,
    disclosure: document.disclosure,
    rights: {
      status: 'review_required',
      basis: rightsBasis,
      policyUrl: rightsPolicyUrl,
      reviewedAt: null,
    },
    status: 'parsed_pending_review',
    normalisedPath,
    normalisedSha256,
    revisionId: normalised.revisionId,
    passageCount: normalised.passages.length,
    totalTokens: normalised.passages.reduce(
      (sum, passage) => sum + passage.tokenCount,
      0,
    ),
    coverage,
    ...extra,
  }
}
