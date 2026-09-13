export function publicManifestMetadata(candidate, approval) {
  return {
    ...candidate,
    status: 'accepted',
    reviewedRevisionId: candidate.revisionId,
    reviewedNormalisedPath: candidate.normalisedPath,
    reviewedNormalisedSha256: candidate.normalisedSha256,
    coverage: { ...candidate.coverage, boundaryReview: 'approved' },
    rawPath: candidate.rawPath,
    rights: {
      status: 'approved',
      basis:
        'SEC EDGAR filing text/data reuse; excludes artwork, linked third-party material and tables.',
      policyUrl:
        'https://www.sec.gov/about/webmaster-frequently-asked-questions',
      reviewedAt: approval.reviewedAt,
      approvalSource: 'explicit owner boundary review',
    },
    reviewStatus: 'approved',
    reviewedAt: approval.reviewedAt,
  }
}
