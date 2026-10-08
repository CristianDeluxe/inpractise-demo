import { bundleFixture } from '@/transcripts/fixtures/bundleFixture'
import { vi } from 'vitest'

/** Answers the lab list and bundle URLs with one reviewed and one raw transcript. */
export function costFetchFixture() {
  const { transcript } = bundleFixture()
  const summary = (id: string, edits: number, reviewed: number) => ({
    id,
    source: {
      ...transcript.source,
      title: `Briefing ${id}`,
      durationSeconds: 3600,
    },
    stats: transcript.stats,
    hasCorrection: edits > 0,
    edits,
    reviewed,
  })
  const reviewedBundle = {
    ...bundleFixture(),
    review: [
      { editId: 'e1', verdict: 'accepted', decidedAt: '2026-01-01T10:00:00Z' },
      { editId: 'e2', verdict: 'rejected', decidedAt: '2026-01-01T10:10:00Z' },
    ],
  }
  const respond = (body: unknown) =>
    new Response(JSON.stringify(body), {
      headers: { 'content-type': 'application/json' },
    })
  const spy = vi.fn(async (url: string) => {
    if (url.endsWith('/transcripts'))
      return Promise.resolve(respond([summary('a', 4, 2), summary('b', 0, 0)]))
    return Promise.resolve(
      respond(url.endsWith('/a') ? reviewedBundle : bundleFixture()),
    )
  })
  vi.stubGlobal('fetch', spy)
  return spy
}
