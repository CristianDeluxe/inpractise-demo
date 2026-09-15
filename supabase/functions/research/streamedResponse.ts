import { askInputOf } from './answer/askInputOf.ts'
import { effectivePrincipal } from './effectivePrincipal.ts'
import type { Principal } from './Principal.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import { streamAsk } from './streamAsk.ts'
import { streamCompare } from './streamCompare.ts'

/**
 * The two actions a caller may follow as an event stream, dispatched under the
 * same effective principal the JSON path would use. Undefined means the
 * request takes the ordinary one-envelope path.
 */
export function streamedResponse(
  principal: Principal,
  request: ResearchRequest,
  envelope: { buildId: string; requestId: string },
): Response | undefined {
  if (!('stream' in request) || request.stream !== true) return undefined
  const effective = effectivePrincipal(principal, request.viewAs)
  if (request.action === 'ask')
    return streamAsk(effective, askInputOf(request), envelope)
  return streamCompare(
    effective,
    { company: request.company, topic: request.topic },
    envelope,
  )
}
