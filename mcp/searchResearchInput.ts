import { z } from 'zod'

/** No org, user or role argument exists: the server's own membership decides
 *  what it can see. */
export const searchResearchInput = {
  query: z.string().min(1).max(2000).describe('The research question'),
  company: z
    .string()
    .max(80)
    .optional()
    .describe('Optional company slug filter'),
  limit: z.number().int().min(1).max(10).optional(),
}
