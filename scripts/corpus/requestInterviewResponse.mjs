import { canonicalJson } from './canonicalJson.mjs'
import { interviewSchema } from './interviewSchema.mjs'

export async function requestInterviewResponse(
  core,
  apiKey,
  deadline,
  context,
) {
  const { prompt, record } = context
  return await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(
      Math.min(90000, Math.max(1, deadline - Date.now())),
    ),
    body: JSON.stringify({
      model: record.model,
      store: false,
      temperature: 0.4,
      max_completion_tokens: 3600,
      messages: [
        { role: 'system', content: prompt },
        {
          role: 'user',
          content: `CORE\n${canonicalJson(core)}\nCopy the four core turns exactly, then complete all six question-and-answer pairs through P16. Each appended answer needs 105–115 words; each question needs 10–15 words. Keep every speakerRole exact and all appended details qualitative.`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'fictional_interview',
          strict: true,
          schema: interviewSchema,
        },
      },
    }),
  })
}
