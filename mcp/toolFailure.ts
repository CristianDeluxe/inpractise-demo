/** A denial is reported as a tool error with the server's own code, never as
 *  an empty result that reads like an absence of evidence. */
export function toolFailure(error: unknown) {
  return {
    isError: true,
    content: [
      {
        type: 'text' as const,
        text: error instanceof Error ? error.message : 'request_failed',
      },
    ],
  }
}
