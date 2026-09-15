import { z } from 'zod'
import { retrievalSummarySchema } from './retrievalSummarySchema.ts'
import { subQuestionPlanSchema } from './subQuestionPlanSchema.ts'

/** Progress reported while an investigation runs: a bounded plan, one
 * retrieval per sub-question, at most one refinement, then synthesis. */
export const investigateStageSchema = z.discriminatedUnion('phase', [
  z.strictObject({
    phase: z.literal('debited'),
    elapsedMs: z.number().nonnegative(),
  }),
  z.strictObject({
    phase: z.literal('plan'),
    elapsedMs: z.number().nonnegative(),
    subQuestions: z.array(subQuestionPlanSchema).max(4),
  }),
  retrievalSummarySchema.extend({
    phase: z.literal('retrieve'),
    step: z.number().int().positive(),
    elapsedMs: z.number().nonnegative(),
  }),
  retrievalSummarySchema.extend({
    phase: z.literal('refine'),
    step: z.number().int().positive(),
    elapsedMs: z.number().nonnegative(),
    question: z.string().min(1),
  }),
  z.strictObject({
    phase: z.literal('synthesise'),
    elapsedMs: z.number().nonnegative(),
    suppliedCount: z.number().int().nonnegative(),
    subQuestionCount: z.number().int().nonnegative(),
  }),
])
