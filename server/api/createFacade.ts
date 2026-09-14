import { openApiDocument } from '@/http-api/openApiDocument.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import { createLimiter } from './createLimiter.ts'
import { executeOperation } from './executeOperation.ts'
import { jsonResponse } from './jsonResponse.ts'
import { problemResponse } from './problemResponse.ts'
import { requestId } from './requestId.ts'

export function createFacade(config: FacadeConfig) {
  const limit = createLimiter(config)
  return async (request: Request): Promise<Response> => {
    const started = performance.now()
    let backendMs = 0
    let result: Response
    const correlationId = requestId(request.headers.get('x-request-id'))
    const headers = new Headers({
      'x-request-id': correlationId,
      'x-correlation-id': correlationId,
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    })
    try {
      if (new URL(request.url).pathname === '/api/v1/openapi.json') {
        if (request.method !== 'GET')
          throw new FacadeError(
            405,
            'method_not_allowed',
            'Use GET for this endpoint.',
            { allow: 'GET' },
          )
        result = jsonResponse(openApiDocument, headers)
      } else
        result = await executeOperation(
          {
            ...config,
            recordBackendTime: (ms) => {
              backendMs += ms
            },
          },
          limit,
          {
            request,
            headers,
            correlationId,
          },
        )
    } catch (cause) {
      result = problemResponse(cause, correlationId, headers)
    }
    const total = performance.now() - started
    result.headers.set(
      'server-timing',
      `backend;dur=${backendMs.toFixed(3)}, facade;dur=${Math.max(0, total - backendMs).toFixed(3)}`,
    )
    return result
  }
}
