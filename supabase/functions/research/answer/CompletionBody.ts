/** The chat completion response, as far as it is read. */
export type CompletionBody = {
  choices?: { message?: { content?: string } }[]
  usage?: unknown
}
