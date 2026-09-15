export type ChatCompletionInput = {
  system: string
  user: string
  maxTokens: number
  json: boolean
  failureMessage: string
  /** Defaults to the answer model when omitted. */
  model?: string
}
