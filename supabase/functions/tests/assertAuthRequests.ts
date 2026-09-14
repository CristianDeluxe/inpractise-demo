export function assertAuthRequests(
  requests: readonly Request[],
  token: string | null,
) {
  if (requests.length !== (token ? 1 : 0))
    throw new Error('Evidence was queried after rejection')
  if (!token) return
  const request = requests[0]
  if (request?.url !== 'https://example.supabase.co/auth/v1/user')
    throw new Error('Unexpected Auth endpoint')
  if (request.headers.get('authorization') !== `Bearer ${token}`)
    throw new Error('Auth did not receive the caller token')
}
