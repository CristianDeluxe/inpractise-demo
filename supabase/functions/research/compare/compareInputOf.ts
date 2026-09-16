import type { CompareInput } from './CompareInput.ts'

/** Builds the cross-reference input, omitting the company key so retrieval
 * treats it as every company the caller may read rather than as an empty
 * scope. */
export function compareInputOf(request: {
  topic: string
  company?: string | undefined
}): CompareInput {
  return {
    topic: request.topic,
    ...(request.company === undefined ? {} : { company: request.company }),
  }
}
