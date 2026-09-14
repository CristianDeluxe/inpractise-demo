import type { IncomingMessage, ServerResponse } from 'node:http'
import { createFacade } from './createFacade.ts'
import { loadFacadeConfig } from './loadFacadeConfig.ts'
import { nodeRequestUrl } from './nodeRequestUrl.ts'
import { problemResponse } from './problemResponse.ts'
import { readNodeBody } from './readNodeBody.ts'
import { requestId } from './requestId.ts'
import { writeNodeResponse } from './writeNodeResponse.ts'

export function createApiListener() {
  const facade = createFacade(loadFacadeConfig())
  return async (
    incoming: IncomingMessage,
    outgoing: ServerResponse,
  ): Promise<void> => {
    const headers = new Headers()
    for (const [name, value] of Object.entries(incoming.headers))
      if (typeof value === 'string') headers.set(name, value)
    try {
      const body = await readNodeBody(incoming)
      const request = new Request(nodeRequestUrl(incoming.url ?? '/'), {
        method: incoming.method ?? 'GET',
        headers,
        ...(body === undefined ? {} : { body }),
      })
      await writeNodeResponse(await facade(request), outgoing)
    } catch (cause) {
      const id = requestId(headers.get('x-request-id'))
      await writeNodeResponse(
        problemResponse(
          cause,
          id,
          new Headers({
            'x-correlation-id': id,
            'x-robots-tag': 'noindex, nofollow',
          }),
        ),
        outgoing,
      )
    }
  }
}
