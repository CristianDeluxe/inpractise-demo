import { askStages } from './actions/askStages.ts'
import type { AskInput } from './answer/AskInput.ts'
import type { Principal } from './Principal.ts'
import type { StreamEnvelope } from './StreamEnvelope.ts'
import { streamStages } from './streamStages.ts'

/** The ask pipeline over the event-stream transport. */
export function streamAsk(
  principal: Principal,
  input: AskInput,
  envelope: StreamEnvelope,
): Response {
  const { query, company, history } = input
  return streamStages(askStages(principal, query, company, history), {
    action: 'ask',
    orgId: principal.orgId,
    ...envelope,
  })
}
