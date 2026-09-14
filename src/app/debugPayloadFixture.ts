import { diagnosticsFixture } from './diagnosticsFixture'

export function debugPayloadFixture() {
  return {
    corpus: {
      documents: 1,
      revisions: 2,
      passages: 4,
      vectors: 4,
      report: null,
      diagnosis: 'unclassified',
    },
    recentRequests: [
      {
        requestId: 'request-1',
        recordedAt: '2026-09-14T10:00:00Z',
        totalTokens: 1200,
        diagnostics: diagnosticsFixture,
      },
      {
        requestId: 'request-2',
        recordedAt: '2026-09-14T09:00:00Z',
        totalTokens: null,
        diagnostics: null,
      },
    ],
  }
}
