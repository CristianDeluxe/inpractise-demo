import { vi } from 'vitest'

/** Stubs fetch so every call waits until the test releases it; records each body. */
export function heldFetch() {
  const bodies: string[] = []
  const releases: (() => void)[] = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url: string, init?: RequestInit) => {
      bodies.push(typeof init?.body === 'string' ? init.body : '')
      await new Promise<void>((resolve) => {
        releases.push(resolve)
      })
      return new Response('{}', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }),
  )
  return { bodies, releases }
}
