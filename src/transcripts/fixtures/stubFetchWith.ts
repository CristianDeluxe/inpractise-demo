import { vi } from 'vitest'

/** Stubs global fetch with a fresh response per call. */
export function stubFetchWith(make: () => Response) {
  const spy = vi.fn(async () => await Promise.resolve(make()))
  vi.stubGlobal('fetch', spy)
  return spy
}
