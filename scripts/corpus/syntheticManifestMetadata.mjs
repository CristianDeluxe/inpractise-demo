export function syntheticManifestMetadata(source, record) {
  return {
    status: 'accepted',
    revisionLabel: 'v1',
    sourceMaterial: 'frozen_core',
    expansionRejected: !!record,
    expansionStatus:
      record?.status ??
      (source.sourceId === 'S6' ? 'not_applicable' : 'not_attempted'),
    generationRecord: record
      ? `corpus/generated/${source.documentId}.generation.json`
      : null,
    rights: {
      status: 'approved',
      basis:
        'Original fictional test data explicitly supplied in the authorized specification; no real expert or company is represented.',
      policyUrl: null,
      reviewedAt: null,
      approvalSource: 'BRIEFING_E and frozen specification 05 section 2',
    },
    reviewStatus: 'authorized_frozen_core',
    coverage: {
      acceptedSections: ['Interview'],
      excludedSections: [
        'Generated expansions: did not pass the fixed validation gate.',
      ],
    },
  }
}
