import { ApiError } from '../_shared/http/ApiError.ts'
import { corsHeaders } from '../_shared/http/corsHeaders.ts'
import { jsonResponse } from '../_shared/http/jsonResponse.ts'
import { statusForCode } from '../_shared/http/statusForCode.ts'
import { askInputOf } from './answer/askInputOf.ts'
import { authenticate } from './authenticate.ts'
import { buildId } from './buildId.ts'
import { effectivePrincipal } from './effectivePrincipal.ts'
import { maxBodyBytes } from './maxBodyBytes.ts'
import { RequestSchema } from './RequestSchema.ts'
import { researchResponse } from './researchResponse.ts'
import { routeAction } from './routeAction.ts'
import { streamAsk } from './streamAsk.ts'

Deno.serve(async (request) => {
  const requestId = crypto.randomUUID()
  if (request.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders })
  try {
    if (request.method !== 'POST')
      throw new ApiError('invalid_request', 'POST only')
    const body = await request.text()
    if (body.length > maxBodyBytes)
      throw new ApiError('invalid_request', 'Body too large')
    let payload: unknown
    try {
      payload = JSON.parse(body)
    } catch {
      throw new ApiError('invalid_request', 'Body was not JSON')
    }
    const parsed = RequestSchema.safeParse(payload)
    if (!parsed.success)
      throw new ApiError('invalid_request', 'Request failed its schema')
    const principal = await authenticate(request)
    if (parsed.data.action === 'ask' && parsed.data.stream)
      return streamAsk(
        effectivePrincipal(principal, parsed.data.viewAs),
        askInputOf(parsed.data),
        { buildId, requestId },
      )
    const data = await routeAction(principal, parsed.data)
    return researchResponse(
      { action: parsed.data.action, data, buildId, requestId },
      principal.orgId,
    )
  } catch (cause) {
    const error =
      cause instanceof ApiError
        ? cause
        : new ApiError('dependency_failure', 'Unhandled failure', true)
    return jsonResponse(
      {
        error: {
          code: error.code,
          message: error.message,
          retryable: error.retryable,
        },
        requestId,
      },
      statusForCode(error.code),
    )
  }
})
