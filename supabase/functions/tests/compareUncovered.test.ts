import { createClient } from '@supabase/supabase-js'
import { ApiError } from '../_shared/http/ApiError.ts'
import type { Database } from '../_shared/types/Database.ts'
import { handleCompare } from '../research/actions/handleCompare.ts'
import { runCompareScenario } from './runCompareScenario.ts'

Deno.test('a side without evidence is reported, not judged', async (t) => {
  await t.step(
    'a company with interviews and no filing skips the provider',
    async () => {
      const { stages, result, requests } = await runCompareScenario({
        sides: { interviews: true, filings: false },
      })
      if (
        stages.map((stage) => stage.phase).join(' ') !==
        'debited retrieved selected'
      )
        throw new Error(
          'The pipeline continued past selection without a filing',
        )
      if (result.uncovered.join() !== 'filings')
        throw new Error(
          `Unexpected uncovered sides: ${result.uncovered.join()}`,
        )
      if (
        result.sides.filings.status !== 'not_found' ||
        result.sides.filings.claims.length
      )
        throw new Error('The uncovered side carried a verdict')
      if (result.sides.interviews.claims.length || result.relations.length)
        throw new Error('Claims were published without a comparison')
      if (result.sides.interviews.candidateCount !== 1)
        throw new Error('The covered side lost its candidate count')
      if (requests.some((request) => request.url.endsWith('/chat/completions')))
        throw new Error('The provider was called with one side empty')
    },
  )
  await t.step(
    'the allowance is debited exactly once, before any provider call',
    async () => {
      const { requests } = await runCompareScenario()
      const debits = requests.filter((request) =>
        request.url.endsWith('/rpc/debit_request'),
      )
      const generation = requests.findIndex((request) =>
        request.url.endsWith('/chat/completions'),
      )
      if (debits.length !== 1)
        throw new Error(`Debited ${String(debits.length)} times`)
      if (
        requests.indexOf(debits[0] as { url: string; body: string }) >
        generation
      )
        throw new Error('Generation ran before the debit')
      if (
        requests.filter((request) => request.url.endsWith('/chat/completions'))
          .length !== 1
      )
        throw new Error('The provider was not called exactly once')
    },
  )
  await t.step('an exhausted allowance stops before retrieval', async () => {
    const requests: string[] = []
    const client = createClient<Database>(
      'https://example.supabase.co',
      'test-public-key',
      {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: async (input) => {
            const url = new Request(input).url
            requests.push(url)
            if (!url.endsWith('/rpc/debit_request'))
              throw new Error('Work continued after exhaustion')
            return Promise.resolve(
              new Response(
                JSON.stringify({
                  code: 'P0001',
                  message: 'allowance_exhausted',
                }),
                {
                  status: 400,
                  headers: { 'content-type': 'application/json' },
                },
              ),
            )
          },
        },
      },
    )
    try {
      await handleCompare(
        {
          client,
          userId: 'test-user',
          orgId: 'org-a',
          role: 'member',
          premium: false,
        },
        { company: 'northstar-workflow', topic: 'deployment time' },
      )
      throw new Error('Exhausted compare succeeded')
    } catch (error) {
      if (!(error instanceof ApiError) || error.code !== 'allowance_exhausted')
        throw error
    }
    if (requests.length !== 1) throw new Error('Unexpected request count')
  })
})
