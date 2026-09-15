import { investigateStages } from './actions/investigateStages.ts'
import type { Principal } from './Principal.ts'
import { streamStages } from './streamStages.ts'

/** The investigation loop over the event-stream transport. */
export function streamInvestigate(
  principal: Principal,
  input: { question: string; company: string | undefined },
  envelope: { buildId: string; requestId: string },
): Response {
  return streamStages(
    investigateStages(principal, input.question, input.company),
    { action: 'investigate', orgId: principal.orgId, ...envelope },
  )
}
