import { z } from 'zod'

/** Progress reported while an answer is produced: counts and phase names. */
export const askStageSchema = z.discriminatedUnion('phase', [
  z.strictObject({ phase: z.literal('debited') }),
  z.strictObject({
    phase: z.literal('retrieved'),
    mode: z.enum(['hybrid', 'lexical_only']),
    candidateCount: z.number().int().nonnegative(),
    candidateAt10: z.array(z.string().min(1)).max(10).optional(),
  }),
  z.strictObject({
    phase: z.literal('selected'),
    selectedCount: z.number().int().nonnegative(),
    suppliedCount: z.number().int().nonnegative(),
    selectedTokens: z.number().int().nonnegative(),
    selectedIds: z.array(z.string().min(1)).max(10).optional(),
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
