import { z } from 'zod'
import { ViewAsSchema } from './ViewAsSchema.ts'
import { companySchema } from './fields/companySchema.ts'
import { identifierSchema } from './fields/identifierSchema.ts'
import { querySchema } from './fields/querySchema.ts'

/**
 * Strict by construction: unknown keys are rejected, so a caller cannot smuggle
 * a user, role or organisation claim past the schema and have it reach a query.
 */
export const RequestSchema = z.discriminatedUnion('action', [
  z.strictObject({ action: z.literal('me'), viewAs: ViewAsSchema.optional() }),
  z.strictObject({
    action: z.literal('list'),
    viewAs: ViewAsSchema.optional(),
    company: companySchema,
    kind: z.enum(['synthetic_interview', 'sec_filing']).optional(),
  }),
  z.strictObject({
    action: z.literal('read'),
    viewAs: ViewAsSchema.optional(),
    documentId: identifierSchema,
    revisionId: identifierSchema,
    passageId: identifierSchema,
  }),
  z.strictObject({
    action: z.literal('search'),
    viewAs: ViewAsSchema.optional(),
    query: querySchema,
    company: companySchema,
    limit: z.number().int().min(1).max(10).optional(),
  }),
  z.strictObject({
    action: z.literal('ask'),
    viewAs: ViewAsSchema.optional(),
    query: querySchema,
    company: companySchema,
  }),
  z.strictObject({
    action: z.literal('debug'),
    viewAs: ViewAsSchema.optional(),
  }),
  z.strictObject({
    action: z.literal('provenance'),
    viewAs: ViewAsSchema.optional(),
    requestId: z.uuid(),
  }),
])
