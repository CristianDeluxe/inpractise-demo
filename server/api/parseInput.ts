import { FacadeError } from './FacadeError.ts'
import type { matchOperation } from './matchOperation.ts'
import { queryInput } from './queryInput.ts'

export async function parseInput(
  request: Request,
  route: ReturnType<typeof matchOperation>,
) {
  let raw: unknown = queryInput(request, route)
  if (request.method === 'POST') {
    if (
      request.headers.get('content-type')?.split(';')[0]?.trim() !==
      'application/json'
    )
      throw new FacadeError(
        415,
        'unsupported_media_type',
        'Use application/json.',
      )
    try {
      raw = await request.json()
    } catch {
      throw new FacadeError(422, 'invalid_request', 'Body was not JSON.')
    }
  }
  const parsed = route.operation.input.safeParse(raw)
  if (!parsed.success)
    throw new FacadeError(422, 'invalid_request', 'Request failed its schema.')
  return parsed.data
}
