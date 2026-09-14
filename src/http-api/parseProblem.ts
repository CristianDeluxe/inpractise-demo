import { ApiError } from '../api/ApiError.ts'
import { problemSchema } from './problemSchema.ts'

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
