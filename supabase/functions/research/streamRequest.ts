import { askInputOf } from './answer/askInputOf.ts'
import type { Principal } from './Principal.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import { streamAsk } from './streamAsk.ts'
import { streamInvestigate } from './streamInvestigate.ts'

/**
 * The two actions that report progress over an event stream when asked to.
 * Every other request, and these two without `stream`, take the JSON path.
 */
export function streamRequest(
  principal: Principal,
  request: ResearchRequest,
  envelope: { buildId: string; requestId: string },
): Response | undefined {
  if (request.action === 'ask' && request.stream)
    return streamAsk(principal, askInputOf(request), envelope)
  if (request.action === 'investigate' && request.stream)
    return streamInvestigate(
      principal,
      { question: request.question, company: request.company },
      envelope,
    )
  return undefined
}
