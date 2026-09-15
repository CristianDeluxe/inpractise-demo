import { streamCompare } from '../research/streamCompare.ts'
import { compareTransportFixture } from './compareTransportFixture.ts'
import { parseSseFrames } from './parseSseFrames.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

Deno.test(
  'the streamed cross-reference ends in exactly one result',
  async () => {
    const { fetcher } = compareTransportFixture({})
    const principal = viewAsPrincipalFixture(fetcher)
    const original = globalThis.fetch
    globalThis.fetch = fetcher
    let frames: ReturnType<typeof parseSseFrames> = []
    let type = ''
    try {
      await withTestEnvironment(
        {
          SUPABASE_URL: 'https://example.supabase.co',
          SUPABASE_ANON_KEY: 'test-public-key',
          OPENAI_API_KEY: 'test-provider-key',
        },
        async () => {
          const response = streamCompare(
            principal,
            { company: 'northstar-workflow', topic: 'deployment time' },
            { buildId: 'build-test', requestId: 'request-test' },
          )
          type = response.headers.get('content-type') ?? ''
          frames = parseSseFrames(await response.text())
        },
      )
    } finally {
      globalThis.fetch = original
    }
    if (!type.startsWith('text/event-stream'))
      throw new Error(`Unexpected content type: ${type}`)
    const events = frames.map((frame) => frame.event)
    if (events.join(' ') !== 'stage stage stage stage stage result')
      throw new Error(`Unexpected frames: ${events.join(' ')}`)
    const result = frames.at(-1)?.data
    if (
      result?.['action'] !== 'compare' ||
      result['requestId'] !== 'request-test'
    )
      throw new Error('The terminal envelope did not carry the compare action')
    const data = result['data'] as {
      relations: unknown[]
      uncovered: unknown[]
    }
    if (data.relations.length !== 1 || data.uncovered.length !== 0)
      throw new Error('The terminal envelope lost the comparison')
  },
)
