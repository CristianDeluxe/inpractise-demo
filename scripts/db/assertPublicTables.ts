import assert from 'node:assert/strict'

/**
 * Every public table has row security and no anonymous read; members write
 * only where a row policy scopes the write: their own notes, the shared
 * query-embedding cache, and reviewer decisions in the lab.
 */
export function assertPublicTables(rows: readonly Record<string, unknown>[]) {
  assert.deepEqual(
    rows.map((r) => r['relname']),
    [
      'document_revisions',
      'documents',
      'lab_memory',
      'lab_reviews',
      'lab_transcripts',
      'memberships',
      'organisations',
      'passages',
      'query_embeddings',
      'request_usage',
      'research_notes',
    ],
  )
  assert.ok(
    rows.every(
      (r) => r['relrowsecurity'] === true && r['anon_select'] === false,
    ),
  )
  assert.deepEqual(
    rows.filter((r) => r['member_write'] === true).map((r) => r['relname']),
    ['lab_reviews', 'query_embeddings', 'research_notes'],
  )
}
