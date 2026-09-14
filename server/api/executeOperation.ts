import { authorizeCaller } from './authorizeCaller.ts'
import { callBackend } from './callBackend.ts'
import type { createLimiter } from './createLimiter.ts'
import { evidenceResponse } from './evidenceResponse.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import { jsonResponse } from './jsonResponse.ts'
import { matchOperation } from './matchOperation.ts'
import type { OperationContext } from './OperationContext.ts'
import { parseInput } from './parseInput.ts'
import { principalKey } from './principalKey.ts'
import { projectResponse } from './projectResponse.ts'
import { requireBearer } from './requireBearer.ts'
import { researchPayload } from './researchPayload.ts'

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
  const { authorization, identity } = await authorizeCaller(config, context)
  headers.set('x-request-id', identity.requestId)
  limit(principalKey(authorization), headers)
  const payload = researchPayload(route, input)
  const backend =
    route.name === 'me'
      ? identity
      : await callBackend(config, { authorization, correlationId, payload })
  headers.set('x-request-id', backend.requestId)
  let data: unknown
  try {
    data = route.operation.output.parse(
      projectResponse(payload, backend.data, input),
    )
  } catch (cause) {
    if (cause instanceof FacadeError) throw cause
    throw new FacadeError(
      502,
      'invalid_backend_response',
      'Research evidence failed validation.',
      { requestId: backend.requestId },
    )
  }
  return evidenceResponse(
    data,
    route.name === 'passage',
    context,
    backend.readScope,
  )
}
