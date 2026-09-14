import { ApiError } from '../../_shared/http/ApiError.ts'

export async function readCompletion(
  response: Response,
  onUsage: (usage: unknown) => Promise<void>,
): Promise<string> {
  const body = (await response.json()) as {
    choices?: { message?: { content?: string } }[]
    usage?: unknown
  }
  await onUsage(body.usage)
  const content = body.choices?.[0]?.message?.content
  if (!content) throw new ApiError('invalid_model_answer', 'Empty answer')
  return content
}
