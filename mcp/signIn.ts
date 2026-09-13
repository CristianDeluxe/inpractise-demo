import type { McpConfig } from './McpConfig.ts'

/** A password grant for one ordinary member. The server holds no other key. */
export async function signIn(config: McpConfig): Promise<string> {
  const response = await fetch(
    `${config.url}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        apikey: config.publishableKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email: config.email, password: config.password }),
      signal: AbortSignal.timeout(20_000),
    },
  )
  if (!response.ok) throw new Error('Research sign-in failed')
  const body = (await response.json()) as { access_token?: string }
  if (!body.access_token) throw new Error('Research sign-in returned no token')
  return body.access_token
}
