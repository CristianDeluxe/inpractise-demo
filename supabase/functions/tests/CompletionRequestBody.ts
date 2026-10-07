/** The JSON body of a stubbed chat completion call. */
export type CompletionRequestBody = {
  messages: { content: string }[]
  response_format?: unknown
}
