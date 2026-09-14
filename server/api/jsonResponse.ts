export function jsonResponse(data: unknown, headers: Headers): Response {
  headers.set('content-type', 'application/json')
  return new Response(JSON.stringify(data), { headers })
}
