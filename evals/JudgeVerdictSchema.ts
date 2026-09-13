import { z } from 'zod'

export const JudgeVerdictSchema = z.object({
  grounded: z.boolean(),
  statusAppropriate: z.boolean(),
  reason: z.string().min(1).max(400),
})
