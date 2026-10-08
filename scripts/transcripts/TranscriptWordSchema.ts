import { z } from 'zod'

export const TranscriptWordSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
  confidence: z.number(),
  band: z.enum(['high', 'medium', 'low']),
  flags: z.array(
    z.enum([
      'low-confidence',
      'entity',
      'number',
      'filler',
      'repetition',
      'memory',
    ]),
  ),
})
