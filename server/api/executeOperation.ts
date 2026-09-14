import { authorizeCaller } from './authorizeCaller.ts'
import { callBackend } from './callBackend.ts'
import type { createLimiter } from './createLimiter.ts'
import { evidenceResponse } from './evidenceResponse.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { jsonResponse } from './jsonResponse.ts'
import { matchOperation } from './matchOperation.ts'
import type { OperationContext } from './OperationContext.ts'
import { parseInput } from './parseInput.ts'
import { parseOperationData } from './parseOperationData.ts'
import { principalKey } from './principalKey.ts'
import { requireBearer } from './requireBearer.ts'
import { researchPayload } from './researchPayload.ts'
import { viewingReadScope } from './viewingReadScope.ts'

/**
 * Authenticate before charging the facade quota, then read and validate evidence
 * before considering conditional delivery. A matching ETag never skips backend
 * authorization. Health checks only the facade and makes no backend request.
 */
export async function executeOperation(
  config: FacadeConfig,
  limit: ReturnType<typeof createLimiter>,
  context: OperationContext,
): Promise<Response> {
  const { request, headers, correlationId } = context
  const route = matchOperation(request)
  if (route.name !== 'health') requireBearer(request)
  const input = await parseInput(request, route)
  if (route.name === 'health')
    return jsonResponse(
      route.operation.output.parse({
        status: 'ok',
        scope: 'facade-only',
        backendChecked: false,
      }),
      headers,
    )
  const payload = researchPayload(route, input)
  const { authorization, identity } = await authorizeCaller(
    config,
    context,
    payload.viewAs,
  )
  headers.set('x-request-id', identity.requestId)
  limit(principalKey(authorization), headers)
  const backend =
    route.name === 'me'
      ? identity
      : await callBackend(config, { authorization, correlationId, payload })
  headers.set('x-request-id', backend.requestId)
  const data = parseOperationData(route, payload, backend, input)
  return evidenceResponse(
    data,
    route.name === 'passage',
    context,
    viewingReadScope(backend.readScope, payload.viewAs),
  )
}
