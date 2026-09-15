import { z } from 'zod'
import { viewAsSchema } from '../viewAsSchema.ts'

export const researchRequestSchema = z.discriminatedUnion('action', [
  z.strictObject({ viewAs: viewAsSchema.optional(), action: z.literal('me') }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('list'),
    company: z.string().max(80).optional(),
    kind: z.enum(['synthetic_interview', 'sec_filing']).optional(),
  }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('read'),
    documentId: z.string().min(1),
    revisionId: z.string().min(1),
    passageId: z.string().min(1),
  }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('search'),
    query: z.string().min(1).max(2000),
    company: z.string().max(80).optional(),
    limit: z.number().int().min(1).max(10).optional(),
  }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('ask'),
    query: z.string().min(1).max(2000),
    company: z.string().max(80).optional(),
    history: z
      .array(
        z.strictObject({
          question: z.string().min(1).max(2_000),
          answer: z.string().min(1).max(2_000),
        }),
      )
      .max(3)
      .optional(),
  }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('debug'),
  }),
  z.strictObject({
    viewAs: viewAsSchema.optional(),
    action: z.literal('provenance'),
    requestId: z.string().min(1),
  }),
])
