/** A provider completion that reports 100 prompt and 50 completion tokens. */
export async function completionWithUsageFixture(
  content: string,
): Promise<Response> {
  return Promise.resolve(
    new Response(
      JSON.stringify({
        choices: [{ message: { content } }],
        usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
      }),
    ),
  )
}
