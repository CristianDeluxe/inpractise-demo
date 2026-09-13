import type { z } from 'zod'
import type { RequestSchema } from './RequestSchema.ts'

export type ResearchRequest = z.infer<typeof RequestSchema>
