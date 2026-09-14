import { answerTransportFixture } from './answerTransportFixture.ts'
import type { ResearchHandler } from './ResearchHandler.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

export async function runAnswerScenario(
  handler: ResearchHandler,
  completion: () => Promise<Response>,
  environment: Record<string, string> = {},
) {
  const original = globalThis.fetch
  const { fetcher, requests } = answerTransportFixture(completion)
  globalThis.fetch = fetcher
  let response: Response | undefined
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
        ...environment,
      },
      async () => {
        response = await handler(
          new Request('https://local.test/research', {
            method: 'POST',
            headers: {
              authorization: 'Bearer test-user-token',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              action: 'ask',
              query: 'What does the synthetic source establish?',
            }),
          }),
        )
      },
    )
  } finally {
    globalThis.fetch = original
  }
  if (!response) throw new Error('Handler did not respond')
  if (
    requests.filter((request) => request.url.endsWith('/chat/completions'))
      .length !== 1
  )
    throw new Error('Scenario did not reach exactly one stubbed generation')
  return { response, requests }
}
