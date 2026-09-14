import { createClient } from '@supabase/supabase-js'
import { ApiError } from '../_shared/http/ApiError.ts'
import type { Database } from '../_shared/types/Database.ts'
import { handleAsk } from '../research/actions/handleAsk.ts'

Deno.test(
  'an exhausted Ask stops before retrieval or provider work',
  async () => {
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
      await handleAsk(
        {
          client,
          userId: 'test-user',
          orgId: 'org-a',
          role: 'member',
          premium: false,
        },
        'test question',
        undefined,
      )
      throw new Error('Exhausted Ask succeeded')
    } catch (error) {
      if (!(error instanceof ApiError) || error.code !== 'allowance_exhausted')
        throw error
    }
    if (requests.length !== 1) throw new Error('Unexpected request count')
  },
)
