import { z } from 'zod'

/** Progress reported while a cross-reference is produced: counts per side and phase names. */
export const compareStageSchema = z.discriminatedUnion('phase', [
  z.strictObject({ phase: z.literal('debited') }),
  z.strictObject({
    phase: z.literal('retrieved'),
    mode: z.enum(['hybrid', 'lexical_only']),
    interviewCandidates: z.number().int().nonnegative(),
    filingCandidates: z.number().int().nonnegative(),
  }),
  z.strictObject({
    phase: z.literal('selected'),
    interviewCount: z.number().int().nonnegative(),
    filingCount: z.number().int().nonnegative(),
    selectedTokens: z.number().int().nonnegative(),
  }),
  z.strictObject({
    phase: z.literal('generating'),
    suppliedCount: z.number().int().nonnegative(),
  }),
  z.strictObject({
    phase: z.literal('verifying'),
    citationCount: z.number().int().nonnegative(),
  }),
])
