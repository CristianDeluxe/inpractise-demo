import type { z } from 'zod'
import type { ProviderAnswerSchema } from './ProviderAnswerSchema.ts'

export type ProviderAnswer = z.infer<typeof ProviderAnswerSchema>
