import { z } from 'zod'

/** Only the fields the interview profiles are checked against. */
export const NormalisedInterviewSchema = z.object({
  documentId: z.string(),
  operatorName: z.string(),
  moderatorName: z.string(),
  passages: z.array(
    z.object({
      passageId: z.string(),
      speaker: z.string(),
      speakerRole: z.string(),
    }),
  ),
})
