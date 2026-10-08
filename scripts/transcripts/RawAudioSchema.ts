import { z } from 'zod'
import { RawSentenceSchema } from './RawSentenceSchema.ts'

/** The parakeet-mlx JSON output. */
export const RawAudioSchema = z.object({
  sentences: z.array(RawSentenceSchema),
})
