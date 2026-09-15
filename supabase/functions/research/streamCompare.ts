import { compareStages } from './actions/compareStages.ts'
import type { CompareInput } from './compare/CompareInput.ts'
import type { Principal } from './Principal.ts'
import { streamStages } from './streamStages.ts'

/** The cross-reference pipeline over an event stream: stages first, the verdict last. */
export function streamCompare(
  principal: Principal,
  input: CompareInput,
  envelope: { buildId: string; requestId: string },
): Response {
  return streamStages(
    principal.orgId,
    'compare',
    compareStages(principal, input),
    envelope,
  )
}
