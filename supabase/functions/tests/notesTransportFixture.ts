import type { noteRowFixture } from './noteRowFixture.ts'
import { notesRouteFixture } from './notesRouteFixture.ts'
import { tieredEvidenceFixture } from './tieredEvidenceFixture.ts'

export function notesTransportFixture(
  rows: ReturnType<typeof noteRowFixture>[] = [],
  deleted = false,
) {
  const requests: Request[] = []
  const fetcher: typeof fetch = async (input, init) => {
    const request = new Request(input, init)
    requests.push(request)
    const url = new URL(request.url)
    if (url.origin !== 'https://example.supabase.co')
      throw new Error('Unexpected external request')
    if (url.pathname === '/rest/v1/research_notes')
      return await Promise.resolve(notesRouteFixture(request, rows, deleted))
    return await Promise.resolve(Response.json(tieredEvidenceFixture(url)))
  }
  return { fetcher, requests }
}
