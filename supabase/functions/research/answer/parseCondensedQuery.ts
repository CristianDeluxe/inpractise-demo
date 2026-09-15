import { ApiError } from '../../_shared/http/ApiError.ts'
import { querySchema } from '../fields/querySchema.ts'

/** A rewrite is one line within the query bounds; anything else is a model failure. */
export function parseCondensedQuery(content: string): string {
  const condensed = content.replace(/\s+/g, ' ').trim()
  const parsed = querySchema.safeParse(condensed)
  if (!parsed.success)
    throw new ApiError('invalid_model_answer', 'Question rewrite was unusable')
  return parsed.data
}
