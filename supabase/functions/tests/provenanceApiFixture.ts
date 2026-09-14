/**
 * Split out of researchApiFixture to keep its switch under the complexity
 * budget. Returns undefined for any path it does not recognize, so the
 * caller can fall through to its own routes.
 */
export function provenanceApiFixture(path: string): unknown {
  switch (path) {
    case '/rest/v1/request_usage':
      return {
        request_id: '00000000-0000-0000-0000-000000000000',
        recorded_at: '2026-09-14T10:00:00Z',
        total_tokens: 928,
        diagnostics: {
          candidateAt10: ['s2:rev-1:P2'],
          selectedIds: ['s2:rev-1:P2'],
          selectedTokens: 20,
          revisionIds: ['rev-1', 'rev-0', 'rev-missing'],
        },
      }
    // Deliberately returned out of order relative to the recorded
    // revisionIds above, and missing rev-missing entirely, so the test can
    // tell "keyed by revision id" apart from "returned in transport order"
    // and exercise the not-current/no-document branch for an id the
    // transport never answers.
    case '/rest/v1/document_revisions?currency':
      return [
        { document_id: 's2', revision_id: 'rev-0', is_current: false },
        { document_id: 's2', revision_id: 'rev-1', is_current: true },
      ]
    default:
      return undefined
  }
}
