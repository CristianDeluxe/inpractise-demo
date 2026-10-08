import type { IncomingMessage, ServerResponse } from 'node:http'
import { labHandlers } from './labHandlers.ts'
import { resolveLabRoute } from './resolveLabRoute.ts'

/** Returns false when the path is not a lab API path so Vite can continue. */
export async function handleLabRequest(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const path = (request.url ?? '').split('?')[0] ?? ''
  const route = resolveLabRoute(request.method ?? 'GET', path)
  if (route === null) return false
  await labHandlers[route.kind](
    request,
    response,
    'id' in route ? route.id : '',
  )
  return true
}
