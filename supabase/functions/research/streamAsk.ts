import { askStages } from './actions/askStages.ts'
import type { AskInput } from './answer/AskInput.ts'
import type { Principal } from './Principal.ts'
import { streamStages } from './streamStages.ts'

/** The answer pipeline over an event stream: stages first, the answer last. */
export function streamAsk(
  principal: Principal,
  input: AskInput,
  envelope: { buildId: string; requestId: string },
): Response {
  const { query, company, history } = input
  return streamStages(
    principal.orgId,
    'ask',
    askStages(principal, query, company, history),
    envelope,
  )
}
