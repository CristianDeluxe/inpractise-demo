import { z } from 'zod'
import { citationWireSchema } from '../api/validators/citationWireSchema.ts'

/**
 * Only immutable passage fields belong in this representation. Mutable current
 * revision status and envelope metadata are excluded because the strong ETag is
 * based on scoped evidence identity rather than a hash of the response body.
 */
export const passageOutput = z.strictObject({
  citation: citationWireSchema,
  section: z.string(),
  neighbourIds: z.array(z.string().min(1)),
})
