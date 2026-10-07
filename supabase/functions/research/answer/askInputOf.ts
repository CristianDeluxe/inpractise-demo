import type { AskInput } from './AskInput.ts'
import type { AskRequestInput } from './AskRequestInput.ts'

/** The validated ask request as the pipeline's one input value. */
export function askInputOf(request: AskRequestInput): AskInput {
  return {
    query: request.query,
    company: request.company,
    history: request.history ?? [],
  }
}
