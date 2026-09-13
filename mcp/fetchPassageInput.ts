import { z } from 'zod'

export const fetchPassageInput = {
  documentId: z.string().min(1).max(200),
  revisionId: z.string().min(1).max(200),
  passageId: z.string().min(1).max(200),
}
