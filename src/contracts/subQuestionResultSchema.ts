import { z } from 'zod'

/** One part of the question as the answer reports it: the question retrieval
 * finally ran on, what it found, and whether the corpus could establish it. */
export const subQuestionResultSchema = z.strictObject({
  index: z.number().int().positive(),
  question: z.string().min(1),
  company: z.string().max(80).optional(),
  originalQuestion: z.string().min(1).optional(),
  status: z.enum(['answered', 'partial', 'not_found']),
  mode: z.enum(['hybrid', 'lexical_only']),
  candidateCount: z.number().int().nonnegative(),
  selectedCount: z.number().int().nonnegative(),
  suppliedCount: z.number().int().nonnegative(),
  citationIds: z.array(z.string().min(1)),
})
