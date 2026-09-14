import { createClient } from '@supabase/supabase-js'
import type { Target } from '../../scripts/db/Target.ts'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import { searchEvidence } from '../../supabase/functions/research/actions/searchEvidence.ts'

/** Real caller-scoped SQL and MCP transport with controlled query embeddings. */
export function localLexicalTransport(
  target: Target,
  original: typeof fetch,
): typeof fetch {
  return async (input, init) => {
    const request = new Request(input, init)
    if (new URL(request.url).hostname === 'api.openai.com')
      throw new Error('Paid providers are forbidden in parity tests')
    if (!request.url.endsWith('/functions/v1/research'))
      return original(input, init)
    const body = (await request.clone().json()) as {
      action: string
      query: string
      limit: number
    }
    if (body.action !== 'search') return original(input, init)
    const client = createClient<Database>(target.url, target.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: original,
        headers: { authorization: request.headers.get('authorization') ?? '' },
      },
    })
    const data = await searchEvidence(
      { client, userId: '', orgId: '', role: 'member', premium: false },
      { query: body.query, embedding: null },
      body.limit,
    )
    return new Response(JSON.stringify({ data }), {
      headers: { 'content-type': 'application/json' },
    })
  }
}
