import { z } from 'zod'

/** The ask payload as the deployed function renders it, validated so a shape
 *  change fails the evaluation instead of scoring an empty answer. */
export const AskResultSchema = z.looseObject({
  status: z.enum(['answered', 'partial', 'conflict', 'not_found']),
  claims: z.array(
    z.looseObject({ text: z.string(), citationIds: z.array(z.string()) }),
  ),
  missingEvidence: z.array(z.string()),
  citations: z.array(
    z.looseObject({
      citationId: z.string(),
      quote: z.string(),
      title: z.string(),
    }),
  ),
  mode: z.string(),
  candidateCount: z.number().int(),
})
