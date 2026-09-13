export function readGenerationMetadata(body, entry) {
  entry.usage = body.usage
    ? {
        promptTokens: body.usage.prompt_tokens,
        completionTokens: body.usage.completion_tokens,
        totalTokens: body.usage.total_tokens,
      }
    : null
  entry.responseModel = body.model
  const choice = body.choices?.[0]
  entry.finishReason = choice?.finish_reason ?? null
  if (choice?.message?.refusal || entry.finishReason === 'content_filter') {
    entry.status = 'CONTENT_FILTER'
    return 'stop'
  }
  return 'continue'
}
