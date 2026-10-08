import type { z } from 'zod'
import type { CorrectionResponseSchema } from './CorrectionResponseSchema.ts'

export type CorrectionResponse = z.infer<typeof CorrectionResponseSchema>
