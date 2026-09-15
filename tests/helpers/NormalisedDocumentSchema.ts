import { z } from 'zod'

/** Only the fields the landing hero answer is checked against. */
export const NormalisedDocumentSchema = z.object({
  documentId: z.string(),
  revisionId: z.string(),
  interviewDate: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  passages: z.array(
    z.object({
      passageId: z.string(),
      speaker: z.string(),
      speakerRole: z.string(),
      text: z.string(),
    }),
  ),
})
