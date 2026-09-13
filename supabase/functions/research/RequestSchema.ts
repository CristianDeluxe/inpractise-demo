import { z } from 'zod'
import { companySchema } from './fields/companySchema.ts'
import { identifierSchema } from './fields/identifierSchema.ts'
import { querySchema } from './fields/querySchema.ts'

/**
 * Strict by construction: unknown keys are rejected, so a caller cannot smuggle
 * a user, role or organisation claim past the schema and have it reach a query.
 */
export const RequestSchema = z.discriminatedUnion('action', [
  z.strictObject({ action: z.literal('me') }),
  z.strictObject({
    action: z.literal('list'),
    company: companySchema,
    kind: z.enum(['synthetic_interview', 'sec_filing']).optional(),
  }),
  z.strictObject({
    action: z.literal('read'),
    documentId: identifierSchema,
    revisionId: identifierSchema,
    passageId: identifierSchema,
  }),
  z.strictObject({
    action: z.literal('search'),
    query: querySchema,
    company: companySchema,
    limit: z.number().int().min(1).max(10).optional(),
  }),
  z.strictObject({
    action: z.literal('ask'),
    query: querySchema,
    company: companySchema,
  }),
  z.strictObject({ action: z.literal('debug') }),
])
