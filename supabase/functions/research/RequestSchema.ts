import { z } from 'zod'
import { ViewAsSchema } from './ViewAsSchema.ts'
import { companySchema } from './fields/companySchema.ts'
import { historySchema } from './fields/historySchema.ts'
import { identifierSchema } from './fields/identifierSchema.ts'
import { noteSchema } from './fields/noteSchema.ts'
import { querySchema } from './fields/querySchema.ts'
import { scopedCompanySchema } from './fields/scopedCompanySchema.ts'

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
    history: historySchema.optional(),
    stream: z.literal(true).optional(),
  }),
  z.strictObject({
    action: z.literal('compare'),
    viewAs: ViewAsSchema.optional(),
    company: scopedCompanySchema,
    topic: querySchema,
    stream: z.literal(true).optional(),
  }),
  z.strictObject({
    action: z.literal('investigate'),
    viewAs: ViewAsSchema.optional(),
    question: querySchema,
    company: companySchema,
    stream: z.literal(true).optional(),
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
  z.strictObject({
    action: z.literal('note_save'),
    viewAs: ViewAsSchema.optional(),
    documentId: identifierSchema,
    revisionId: identifierSchema,
    passageId: identifierSchema,
    question: querySchema.optional(),
    note: noteSchema.optional(),
  }),
  z.strictObject({
    action: z.literal('note_list'),
    viewAs: ViewAsSchema.optional(),
  }),
  z.strictObject({
    action: z.literal('note_delete'),
    viewAs: ViewAsSchema.optional(),
    noteId: z.uuid(),
  }),
])
