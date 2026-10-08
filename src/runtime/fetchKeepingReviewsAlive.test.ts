import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchKeepingReviewsAlive } from './fetchKeepingReviewsAlive'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchKeepingReviewsAlive', () => {
  it('keeps a small review write alive and nothing else', async () => {
    const spy = vi.fn(async (_input: unknown, _init?: RequestInit) =>
      Promise.resolve(new Response('{}')),
    )
    vi.stubGlobal('fetch', spy)
    const reviews = 'https://x.supabase.co/rest/v1/lab_reviews'
    await fetchKeepingReviewsAlive(reviews, { method: 'POST', body: '[]' })
    await fetchKeepingReviewsAlive(reviews, {
      method: 'POST',
      body: 'x'.repeat(70_000),
    })
    await fetchKeepingReviewsAlive(reviews, { method: 'GET' })
    await fetchKeepingReviewsAlive('https://x.supabase.co/rest/v1/lab_memory', {
      method: 'POST',
      body: '[]',
    })
    const keepalive = spy.mock.calls.map(([, init]) => init?.keepalive === true)
    expect(keepalive).toEqual([true, false, false, false])
  })
})
