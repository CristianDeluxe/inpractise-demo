import type { IncomingMessage, ServerResponse } from 'node:http'
import { isLoopbackRequest } from './isLoopbackRequest.ts'
import { labHandlers } from './labHandlers.ts'
import { resolveLabRoute } from './resolveLabRoute.ts'
import { sendJson } from './sendJson.ts'

/** Returns false when the path is not a lab API path so Vite can continue; remote callers get 403. */
export async function handleLabRequest(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const path = (request.url ?? '').split('?')[0] ?? ''
  const route = resolveLabRoute(request.method ?? 'GET', path)
  if (route === null) return false
  if (!isLoopbackRequest(request)) {
    sendJson(response, 403, { error: 'The lab API only answers this machine.' })
    return true
  }
  await labHandlers[route.kind](
    request,
    response,
    'id' in route ? route.id : '',
  )
  return true
}
