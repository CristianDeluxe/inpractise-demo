import type { BranchRow } from '../types/BranchRow.ts'

export function candidateKey(row: BranchRow): string {
  return `${row.document_id}:${row.revision_id}:${row.passage_id}`
}
