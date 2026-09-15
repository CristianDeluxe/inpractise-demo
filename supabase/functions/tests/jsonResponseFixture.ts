/** A JSON response, resolved rather than constructed synchronously, matching how a real fetch answers. */
export async function jsonResponseFixture(
  body: unknown,
  status = 200,
): Promise<Response> {
  return Promise.resolve(
    new Response(body === null ? null : JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    }),
  )
}
