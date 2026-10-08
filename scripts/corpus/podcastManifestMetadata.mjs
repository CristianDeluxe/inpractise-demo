import { PODCAST_RIGHTS_BASIS } from './podcastRightsBasis.mjs'

export function podcastManifestMetadata(record) {
  return {
    status: 'accepted',
    rawPath: `corpus/podcasts/${record.youtubeId}.json`,
    youtubeId: record.youtubeId,
    channel: record.channel,
    durationSeconds: record.durationSeconds,
    asrModel: record.asrModel,
    diarization: record.diarization,
    rights: {
      status: 'approved',
      basis: PODCAST_RIGHTS_BASIS,
      policyUrl: null,
      reviewedAt: '2026-10-08T00:00:00Z',
      approvalSource: 'explicit owner approval 2026-10-08',
    },
    reviewStatus: 'approved',
    reviewedAt: '2026-10-08T00:00:00Z',
    coverage: {
      acceptedSections: ['Interview'],
      excludedSections: [],
    },
  }
}
