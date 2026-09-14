export async function completionResponseFixture(
  content: string,
): Promise<Response> {
  return Promise.resolve(
    new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
      headers: { 'content-type': 'application/json' },
    }),
  )
}
