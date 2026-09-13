import { z } from 'zod'

export const BranchRowSchema = z.object({
  org_id: z.string(),
  document_id: z.string(),
  revision_id: z.string(),
  passage_id: z.string(),
  branch: z.enum(['fts', 'vector']),
  rank: z.number().int().positive(),
  lexical_score: z.number().nullable(),
  cosine_distance: z.number().nullable(),
})
