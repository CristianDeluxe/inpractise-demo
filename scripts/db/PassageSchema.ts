import { z } from 'zod'

export const PassageSchema = z
  .object({
    passageId: z.string().min(1).max(80),
    ordinal: z.number().int().nonnegative(),
    section: z.string(),
    speaker: z.string().nullable(),
    speakerRole: z.string().nullable(),
    text: z
      .string()
      .min(1)
      .refine((text) => Array.from(text).length <= 1200),
    tokenCount: z.number().int().min(1).max(500),
    metadataTokenCount: z.number().int().nonnegative().default(0),
  })
  .loose()
