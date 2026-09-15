import type { noteRowFixture } from './noteRowFixture.ts'

/**
 * The research_notes table by HTTP method: a count, a listing, one inserted
 * row, or the outcome of a delete. `deleted` false models a row the policy
 * hides, which PostgREST reports as no row rather than as an error.
 */
export function notesRouteFixture(
  request: Request,
  rows: ReturnType<typeof noteRowFixture>[],
  deleted: boolean,
): Response {
  switch (request.method) {
    case 'HEAD':
      return new Response(null, {
        headers: {
          'content-range': `0-${String(rows.length)}/${String(rows.length)}`,
        },
      })
    case 'POST':
      return Response.json({
        note_id: '00000000-0000-0000-0000-00000000000a',
        created_at: '2026-09-15T10:00:00Z',
      })
    case 'DELETE':
      return Response.json(
        deleted
          ? [
              {
                note_id: new URL(request.url).searchParams
                  .get('note_id')
                  ?.slice(3),
              },
            ]
          : [],
      )
    default:
      return Response.json(rows)
  }
}
