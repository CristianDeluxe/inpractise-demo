import type { Candidate } from '../../_shared/types/Candidate.ts'

export type RecordSelectionInput = {
  request: string
  candidates: readonly Candidate[]
  selectedIds: readonly string[]
  embeddingStored: Promise<void>
}
