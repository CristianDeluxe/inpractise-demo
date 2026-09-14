import { z } from 'zod'

/**
 * Present only for an unrestricted reviewer. Candidate identity is the same
 * `document:revision:passage` key the server ranks on, so a reader can compare
 * what retrieval found against what selection kept.
 */
export const retrievalDiagnosticsOutput = z.strictObject({
  candidateAt10: z.array(z.string().min(1)).max(10),
  selectedIds: z.array(z.string().min(1)),
  selectedTokens: z.number().int().nonnegative(),
  revisionIds: z.array(z.string().min(1).max(64)),
})
