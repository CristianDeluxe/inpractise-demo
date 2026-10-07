import { compareStages } from './actions/compareStages.ts'
import type { CompareInput } from './compare/CompareInput.ts'
import type { Principal } from './Principal.ts'
import type { StreamEnvelope } from './StreamEnvelope.ts'
import { streamStages } from './streamStages.ts'

/** The cross-reference pipeline over an event stream: stages first, the verdict last. */
export function streamCompare(
  principal: Principal,
  input: CompareInput,
  envelope: StreamEnvelope,
): Response {
  return streamStages(compareStages(principal, input), {
    action: 'compare',
    orgId: principal.orgId,
    ...envelope,
  })
}
