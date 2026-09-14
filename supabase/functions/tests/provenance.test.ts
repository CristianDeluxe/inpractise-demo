import { z } from 'zod'
import { answerTransportFixture } from './answerTransportFixture.ts'
import { captureResearchHandler } from './captureResearchHandler.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

Deno.test(
  'provenance returns the caller own request and the currency of its revisions',
  async () => {
    const handler = await captureResearchHandler()
    const original = globalThis.fetch
    const { fetcher } = answerTransportFixture(async () =>
      Promise.reject(new Error('No completion expected for provenance')),
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
              body: JSON.stringify({
                action: 'provenance',
                requestId: '00000000-0000-0000-0000-000000000000',
              }),
            }),
          )
        },
      )
    } finally {
      globalThis.fetch = original
    }
    if (!response) throw new Error('Handler did not respond')
    z.object({
      action: z.literal('provenance'),
      data: z.object({
        requestId: z.literal('00000000-0000-0000-0000-000000000000'),
        revisions: z.tuple([
          z.object({
            revisionId: z.literal('rev-1'),
            documentId: z.literal('s2'),
            current: z.literal(true),
          }),
          z.object({
            revisionId: z.literal('rev-0'),
            documentId: z.literal('s2'),
            current: z.literal(false),
          }),
        ]),
      }),
    }).parse(await response.json())
  },
)
