import { z } from 'zod'
import { JudgeVerdictSchema } from './JudgeVerdictSchema.ts'

/** A retained report is input like any other: parse it before trusting a count. */
export const CaseResultSchema = z.object({
  caseId: z.string().min(1),
  persona: z.string().min(1),
  expectedStatus: z.string().min(1),
  actualStatus: z.string().min(1),
  statusMatched: z.boolean(),
  goldRecallAt10: z.boolean(),
  goldInContext: z.boolean(),
  diagnosis: z.enum(['pass', 'retrieval_miss', 'selection_miss']),
  citationsAllAuthorised: z.boolean(),
  forbiddenStringsLeaked: z.array(z.string()),
  candidateCount: z.number().int().nonnegative(),
  verdict: JudgeVerdictSchema,
})
