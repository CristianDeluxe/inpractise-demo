import { ApiError } from '../ApiError.ts'
import type { ResearchRequest } from '../ResearchRequest.ts'
import { researchRequestSchema } from './researchRequestSchema.ts'

export function validateRequest(request: ResearchRequest): void {
  const result = researchRequestSchema.safeParse(request)
  if (!result.success)
    throw new ApiError(
      'bad_input',
      'The research request does not match the eight-action contract.',
    )
}
