import { answerTransportFixture } from './answerTransportFixture.ts'
import type { ResearchHandler } from './ResearchHandler.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/** One request through the real handler, with the shared evidence fixture. */
export async function sendNoteRequest(
  handler: ResearchHandler,
  body: Record<string, unknown>,
) {
  const original = globalThis.fetch
  const { fetcher, requests } = answerTransportFixture(async () =>
    Promise.reject(new Error('No completion expected')),
  )
  globalThis.fetch = fetcher
  let response: Response | undefined
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
      },
      async () => {
        response = await handler(
          new Request('https://local.test/research', {
            method: 'POST',
            headers: {
              authorization: 'Bearer test-user-token',
              'content-type': 'application/json',
            },
            body: JSON.stringify(body),
          }),
        )
      },
    )
  } finally {
    globalThis.fetch = original
  }
  if (!response) throw new Error('Handler did not respond')
  return { response, requests }
}
