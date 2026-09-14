import { completionResponseFixture } from './completionResponseFixture.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { researchApiFixture } from './researchApiFixture.ts'

export function diagnosticsTransportFixture(): typeof fetch {
  return async (input, init) => {
    const url = new URL(new Request(input, init).url)
    if (url.href === 'https://api.openai.com/v1/chat/completions')
      return completionResponseFixture(providerContentFixture())
    if (url.href === 'https://api.openai.com/v1/embeddings')
      return new Response(null, { status: 503 })
    if (url.origin !== 'https://example.supabase.co')
      throw new Error('Unexpected external request')
    return new Response(JSON.stringify(researchApiFixture(url.pathname)), {
      headers: { 'content-type': 'application/json' },
    })
  }
}
