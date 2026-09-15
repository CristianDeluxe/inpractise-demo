import { z } from 'zod'

/**
 * The company scope travels in the URL so a card on the workspace entry can
 * open Ask or the library already narrowed. A value the plan's slug limit
 * rejects is dropped rather than failing the route: scope is a convenience,
 * and the database decides what the scope may see either way.
 */
export const companySearchSchema = z.object({
  company: z.string().min(1).max(80).optional().catch(undefined),
})
