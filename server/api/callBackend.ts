import type { BackendCall } from './BackendCall.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import { parseBackend } from './parseBackend.ts'

export async function callBackend(config: FacadeConfig, call: BackendCall) {
  if (!config.researchUrl)
    throw new FacadeError(
      503,
      'dependency_failure',
      'RESEARCH_URL is not configured.',
      true,
    )
  let response: Response
  let body: unknown
  const started = performance.now()
  try {
    response = await config.fetch(config.researchUrl, {
      method: 'POST',
      headers: {
        authorization: call.authorization,
        'content-type': 'application/json',
        'x-request-id': call.correlationId,
      },
      body: JSON.stringify(call.payload),
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
    })
    body = await response.json()
  } catch {
    throw new FacadeError(
      503,
      'dependency_failure',
      'Research transport failed.',
      true,
    )
  }
  config.recordBackendTime?.(performance.now() - started)
  return parseBackend(response, body, call.payload.action)
}
