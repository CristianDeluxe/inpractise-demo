import { z } from 'zod'
import { providerAnswerWireSchema } from '../api/validators/providerAnswerWireSchema.ts'
import { evidenceVintageOutput } from '../http-api/evidenceVintageOutput.ts'
import { citationSchema } from './citationSchema'
import { investigationTraceSchema } from './investigationTraceSchema'
import { subQuestionResultSchema } from './subQuestionResultSchema'

/** The grounded-claim contract of a standalone ask, plus the bounded research
 * loop's own scope: the question as asked, one status per sub-question, why
 * the refinement round did or did not run, and how long the loop took. */
export const investigateSchema = providerAnswerWireSchema.extend({
  citations: z.array(citationSchema),
  mode: z.enum(['hybrid', 'lexical_only']),
  candidateCount: z.number().int().nonnegative(),
  vintage: evidenceVintageOutput.optional(),
  question: z.string().min(1),
  subQuestions: z.array(subQuestionResultSchema).max(4),
  refinement: z.enum(['none', 'declined', 'budget', 'applied']),
  elapsedMs: z.number().nonnegative(),
  trace: investigationTraceSchema.optional(),
})
