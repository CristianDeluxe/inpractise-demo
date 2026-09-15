import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { streamAsk } from '../research/streamAsk.ts'
import type { ViewAs } from '../research/ViewAs.ts'
import { diagnosticsTransportFixture } from './diagnosticsTransportFixture.ts'
import { parseSseFrames } from './parseSseFrames.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/** Drives the streaming transport and returns its response and frames. */
export async function runStreamScenario(viewAs: ViewAs | undefined) {
  const fetcher = diagnosticsTransportFixture()
  const principal = effectivePrincipal(viewAsPrincipalFixture(fetcher), viewAs)
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  let response: Response | undefined
  let frames: ReturnType<typeof parseSseFrames> = []
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
      },
      async () => {
        response = streamAsk(
          principal,
          'What does the source say?',
          undefined,
          {
            buildId: 'build-test',
            requestId: 'request-test',
          },
        )
        frames = parseSseFrames(await response.text())
      },
    )
  } finally {
    globalThis.fetch = original
  }
  if (!response) throw new Error('The transport produced no response')
  return { response, frames }
}
