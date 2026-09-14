import { z } from 'zod'
import { citationWireSchema } from '../api/validators/citationWireSchema.ts'

export const passageOutput = z.strictObject({
  citation: citationWireSchema,
  section: z.string(),
  neighbourIds: z.array(z.string().min(1)),
})
