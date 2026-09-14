import { ApiError } from '../api/ApiError.ts'
import { HttpProblemError } from './HttpProblemError.ts'
import type { HttpResult } from './HttpResult.ts'
import type { OperationName } from './OperationName.ts'
import type { OperationOutput } from './OperationOutput.ts'
import { parseHttpData } from './parseHttpData.ts'
import { parseProblem } from './parseProblem.ts'

export async function parseHttpResponse<K extends OperationName>(
  response: Response,
  name: K,
  input: Record<string, unknown>,
): Promise<HttpResult<OperationOutput<K>>> {
  const requestId = response.headers.get('x-request-id')
  if (!requestId) throw new ApiError('protocol', 'Missing request ID.')
  if (response.status === 304) {
    const etag = response.headers.get('etag')
    if (!etag || name !== 'passage')
      throw new ApiError('protocol', 'Unexpected conditional response.')
    return { status: 304, etag, requestId }
  }
  const body: unknown = await response.json()
  if (!response.ok)
    throw new HttpProblemError(parseProblem(response, body, requestId))
  if (response.status !== 200)
    throw new ApiError('protocol', 'Unexpected success status.')
  return {
    status: 200,
    data: parseHttpData(name, input, body),
    etag: response.headers.get('etag'),
    requestId,
  }
}
