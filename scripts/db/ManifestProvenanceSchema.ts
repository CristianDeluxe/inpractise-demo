import { z } from 'zod'

export const ManifestProvenanceSchema = z.object({
  rawHash: z.string().min(1),
  normalizedHash: z.string().min(1),
  rightsBasis: z.string().min(1),
})
