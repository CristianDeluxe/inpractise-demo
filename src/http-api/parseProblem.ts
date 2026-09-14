import { ApiError } from '../api/ApiError.ts'
import { problemSchema } from './problemSchema.ts'

/**
 * Trust problem details only when their status and request ID agree with HTTP.
 * A schema-valid problem for a different request is still a protocol failure,
 * not a research refusal or a reliable retry instruction.
 */
export function parseProblem(
  response: Response,
  body: unknown,
  requestId: string,
) {
  if (
    !response.headers
      .get('content-type')
      ?.startsWith('application/problem+json')
  )
    throw new ApiError('protocol', 'Missing problem media type.')
  const problem = problemSchema.parse(body)
  if (problem.status !== response.status || problem.requestId !== requestId)
    throw new ApiError('protocol', 'Problem metadata disagrees with HTTP.')
  return problem
}
