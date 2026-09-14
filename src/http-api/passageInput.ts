import { z } from 'zod'
import { viewAsSchema } from '../api/viewAsSchema.ts'

export const passageInput = z.strictObject({
  viewAs: viewAsSchema.optional(),
  documentId: z.string().min(1).max(200),
  revisionId: z.string().min(1).max(200),
  passageId: z.string().min(1).max(200),
})
