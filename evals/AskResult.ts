import type { z } from 'zod'
import type { AskResultSchema } from './AskResultSchema.ts'

export type AskResult = z.infer<typeof AskResultSchema>
