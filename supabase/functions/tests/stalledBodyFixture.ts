/**
 * Headers arrive immediately and the body never produces a byte, which is how
 * a provider stall looks from the client: the request is nominally successful
 * and then goes quiet.
 */
export async function stalledBodyFixture(): Promise<Response> {
  return await Promise.resolve(
    new Response(
      new ReadableStream({
        start() {
          // Intentionally never enqueues and never closes.
        },
      }),
      { headers: { 'content-type': 'application/json' } },
    ),
  )
}
