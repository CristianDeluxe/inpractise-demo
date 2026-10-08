import type { z } from 'zod'
import type { RawTokenSchema } from './RawTokenSchema.ts'

export type RawToken = z.infer<typeof RawTokenSchema>
