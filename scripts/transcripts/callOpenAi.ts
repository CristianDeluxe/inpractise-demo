import { correctionJsonSchema } from './correctionJsonSchema.ts'
import { loadOpenAiKey } from './loadOpenAiKey.ts'
import { OpenAiCompletionSchema } from './OpenAiCompletionSchema.ts'
import type { ProviderRequest } from './ProviderRequest.ts'
import type { ProviderResult } from './ProviderResult.ts'

/** Hosted lane: chat completions with strict structured output. */
export async function callOpenAi(
  request: ProviderRequest,
): Promise<ProviderResult> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(300_000),
    headers: {
      authorization: `Bearer ${loadOpenAiKey()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: request.model,
      temperature: 0,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'transcript_correction',
          strict: true,
          schema: correctionJsonSchema(),
        },
      },
      messages: [
        { role: 'system', content: request.instructions },
        { role: 'user', content: request.prompt },
      ],
    }),
  })
  if (!response.ok)
    throw new Error(`OpenAI request failed (HTTP ${String(response.status)})`)
  const body = OpenAiCompletionSchema.parse(await response.json())
  return {
    answer: JSON.parse(body.choices[0]?.message.content ?? 'null'),
    usage: {
      inputTokens: body.usage.prompt_tokens,
      outputTokens: body.usage.completion_tokens,
    },
  }
}
