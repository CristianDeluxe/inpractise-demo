import type { CompareSideName } from './CompareSideName.ts'

/** The document kind each side of a cross-reference retrieves from. */
export const sideKinds: Record<CompareSideName, string> = {
  interviews: 'synthetic_interview',
  filings: 'sec_filing',
}
