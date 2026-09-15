import type { AskInput } from './AskInput.ts'

/** The validated ask request as the pipeline's one input value. */
export function askInputOf(request: {
  query: string
  company?: string | undefined
  history?: readonly { question: string; answer: string }[] | undefined
}): AskInput {
  return {
    query: request.query,
    company: request.company,
    history: request.history ?? [],
  }
}
