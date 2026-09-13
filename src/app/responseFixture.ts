export function responseFixture(action: string, data: unknown) {
  return new Response(
    JSON.stringify({ action, data, buildId: 'build', requestId: 'request' }),
    { headers: { 'content-type': 'application/json' } },
  )
}
