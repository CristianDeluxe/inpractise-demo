import { investigateStages } from './actions/investigateStages.ts'
import type { InvestigateInput } from './investigate/InvestigateInput.ts'
import type { Principal } from './Principal.ts'
import type { StreamEnvelope } from './StreamEnvelope.ts'
import { streamStages } from './streamStages.ts'

/** The investigation loop over the event-stream transport. */
export function streamInvestigate(
  principal: Principal,
  input: InvestigateInput,
  envelope: StreamEnvelope,
): Response {
  return streamStages(
    investigateStages(principal, input.question, input.company),
    { action: 'investigate', orgId: principal.orgId, ...envelope },
  )
}
