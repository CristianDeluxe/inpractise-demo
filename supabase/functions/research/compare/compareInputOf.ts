import type { CompareInput } from './CompareInput.ts'
import type { CompareRequestInput } from './CompareRequestInput.ts'

/** Builds the cross-reference input, omitting the company key so retrieval
 * treats it as every company the caller may read rather than as an empty
 * scope. */
export function compareInputOf(request: CompareRequestInput): CompareInput {
  return {
    topic: request.topic,
    ...(request.company === undefined ? {} : { company: request.company }),
  }
}
