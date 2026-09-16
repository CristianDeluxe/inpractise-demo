export function annualReportManifestMetadata(candidate, approval) {
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
      basis: candidate.rights.basis,
      policyUrl: candidate.rights.policyUrl,
      reviewedAt: approval.reviewedAt,
      approvalSource: 'explicit owner boundary review',
    },
    reviewStatus: 'approved',
    reviewedAt: approval.reviewedAt,
  }
}
