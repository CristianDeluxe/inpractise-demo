import type { CompareSideName } from './CompareSideName.ts'

/** Claim ids are server-assigned: the side prefix plus the model's 1-based position. */
export const claimPrefixes: Record<CompareSideName, string> = {
  interviews: 'i',
  filings: 'f',
}
