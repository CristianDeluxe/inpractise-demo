import { z } from 'zod'
import { investigationTraceStepSchema } from './investigationTraceStepSchema'

export const investigationTraceSchema = z.strictObject({
  steps: z.array(investigationTraceStepSchema),
})
