import { ApiError } from '../_shared/http/ApiError.ts'
import { authenticate } from '../research/authenticate.ts'
import { assertAuthRequests } from './assertAuthRequests.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

export async function assertRejectedToken(
  token: string | null,
  reason: string,
  authStatus = 401,
) {
  const originalFetch = globalThis.fetch
  const requests: Request[] = []
  globalThis.fetch = async (input, init) => {
    requests.push(new Request(input, init))
    return Promise.resolve(
      new Response(JSON.stringify({ message: reason }), { status: authStatus }),
    )
  }
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
      },
      async () => {
        const headers = new Headers()
        if (token) headers.set('authorization', `Bearer ${token}`)
        try {
          await authenticate(
            new Request('https://local.test/research', { headers }),
          )
          throw new Error('Invalid token was accepted')
        } catch (error) {
          if (!(error instanceof ApiError) || error.code !== 'unauthenticated')
            throw error
        }
        assertAuthRequests(requests, token)
      },
    )
  } finally {
    globalThis.fetch = originalFetch
  }
}
