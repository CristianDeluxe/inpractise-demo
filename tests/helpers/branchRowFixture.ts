import type { BranchRow } from '../../supabase/functions/_shared/types/BranchRow.ts'

export function branchRowFixture(
  overrides: Partial<BranchRow> = {},
): BranchRow {
  return {
    org_id: 'org-a',
    document_id: 'doc-1',
    revision_id: 'rev-1',
    passage_id: 'p-1',
    branch: 'fts',
    rank: 1,
    lexical_score: 0.5,
    cosine_distance: null,
    ...overrides,
  }
}
