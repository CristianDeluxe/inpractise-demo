/**
 * Some provider calls (`embedQuery`) use the bare global `fetch` rather than a
 * client's own fetcher, so a stub covering them must also stand in for
 * `globalThis.fetch` for the duration of the call.
 */
export async function withGlobalFetch(
  fetcher: typeof fetch,
  run: () => Promise<void>,
): Promise<void> {
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  try {
    await run()
  } finally {
    globalThis.fetch = original
  }
}
