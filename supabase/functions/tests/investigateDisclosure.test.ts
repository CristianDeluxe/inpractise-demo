import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { streamInvestigate } from '../research/streamInvestigate.ts'
import type { ViewAs } from '../research/ViewAs.ts'
import { investigateScenario } from './investigateScenario.ts'
import { investigateTransportFixture } from './investigateTransportFixture.ts'
import { parseSseFrames } from './parseSseFrames.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

Deno.test('trace detail follows the effective principal', async (t) => {
  const completions = [
    planContentFixture([
      { question: 'How long did the Northstar migration take?' },
      { question: 'How long did the Harbor migration take?' },
    ]),
    synthesisContentFixture([
      { index: 1, status: 'answered' },
      { index: 2, status: 'answered' },
    ]),
  ]
  await t.step('an unrestricted reviewer gets identifiers', async () => {
    const { stages, result } = await investigateScenario({ completions })
    const retrieve = stages.find((stage) => stage.phase === 'retrieve')
    if (retrieve?.phase !== 'retrieve' || !retrieve.candidateAt10?.length)
      throw new Error('Unrestricted reviewer received no ranked candidates')
    if (!result?.['trace'])
      throw new Error('Unrestricted reviewer received no trace')
  })
  await t.step('a restricted view gets counts only', async () => {
    const restricted: ViewAs[] = [{ role: 'member' }, { premium: false }]
    for (const viewAs of restricted) {
      const { stages, result } = await investigateScenario({
        completions,
        viewAs,
      })
      for (const stage of stages)
        if (
          (stage.phase === 'retrieve' || stage.phase === 'refine') &&
          (stage.candidateAt10 || stage.selectedIds)
        )
          throw new Error('A restricted view received identifiers')
      if (result?.['trace'])
        throw new Error('A restricted view received a trace')
    }
  })
  await t.step(
    'the stream ends in exactly one investigate result',
    async () => {
      const { fetcher } = investigateTransportFixture({ completions })
      const principal = effectivePrincipal(
        viewAsPrincipalFixture(fetcher),
        undefined,
      )
      const original = globalThis.fetch
      globalThis.fetch = fetcher
      let frames: ReturnType<typeof parseSseFrames> = []
      try {
        await withTestEnvironment(
          {
            SUPABASE_URL: 'https://example.supabase.co',
            SUPABASE_ANON_KEY: 'test-public-key',
            OPENAI_API_KEY: 'test-provider-key',
          },
          async () => {
            const response = streamInvestigate(
              principal,
              { question: 'How did both migrations go?', company: undefined },
              { buildId: 'build-test', requestId: 'request-test' },
            )
            frames = parseSseFrames(await response.text())
          },
        )
      } finally {
        globalThis.fetch = original
      }
      const events = frames.map((frame) => frame.event)
      if (events.filter((event) => event === 'result').length !== 1)
        throw new Error(`Expected one result: ${events.join(' ')}`)
      if (
        events.at(-1) !== 'result' ||
        events.slice(0, -1).some((e) => e !== 'stage')
      )
        throw new Error(`Unexpected event order: ${events.join(' ')}`)
      if (frames.at(-1)?.data['action'] !== 'investigate')
        throw new Error(
          'The terminal envelope did not carry the investigate action',
        )
    },
  )
})
