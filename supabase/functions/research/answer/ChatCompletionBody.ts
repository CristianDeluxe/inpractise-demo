/** The part of a chat completion request that differs between callers. */
export type ChatCompletionBody = {
  messages: readonly { role: 'system' | 'user'; content: string }[]
  max_completion_tokens: number
  response_format?: { type: 'json_object' }
}
