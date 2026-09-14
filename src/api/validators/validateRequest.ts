import { z } from 'zod'
import { ApiError } from '../ApiError.ts'
import type { ResearchRequest } from '../ResearchRequest.ts'
import { viewAsSchema } from '../viewAsSchema.ts'

export function validateRequest(request: ResearchRequest): void {
  const company = z.string().max(80).optional()
  const query = z.string().min(1).max(2000)
  const id = z.string().min(1)
  const result = z
    .discriminatedUnion('action', [
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('me'),
      }),
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('list'),
        company,
        kind: z.enum(['synthetic_interview', 'sec_filing']).optional(),
      }),
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('read'),
        documentId: id,
        revisionId: id,
        passageId: id,
      }),
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('search'),
        query,
        company,
        limit: z.number().int().min(1).max(10).optional(),
      }),
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('ask'),
        query,
        company,
      }),
      z.strictObject({
        viewAs: viewAsSchema.optional(),
        action: z.literal('debug'),
      }),
    ])
    .safeParse(request)
  if (!result.success)
    throw new ApiError(
      'bad_input',
      'The research request does not match the six-action contract.',
    )
}
