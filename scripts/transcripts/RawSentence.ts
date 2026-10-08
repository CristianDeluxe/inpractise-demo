import type { z } from 'zod'
import type { RawSentenceSchema } from './RawSentenceSchema.ts'

export type RawSentence = z.infer<typeof RawSentenceSchema>
