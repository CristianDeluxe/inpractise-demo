import { z } from 'zod'

/** One planned sub-question, as the server reported it in the `plan` phase. */
export const subQuestionPlanSchema = z.strictObject({
  index: z.number().int().positive(),
  question: z.string().min(1),
  company: z.string().max(80).optional(),
})
