import { filterByEquality } from './filterByEquality'
import { jsonResponse } from './jsonResponse'
import type { LabRequest } from './LabRequest'
import type { LabTables } from './LabTables'
import type { LabWrite } from './LabWrite'

/** Plays PostgREST and Storage for the lab: reads from `tables`, records writes, signs URLs. */
export function answerLabRequest(
  tables: LabTables,
  writes: LabWrite[],
  denyWrites: boolean,
  request: LabRequest,
): Response {
  const url = new URL(request.url)
  const signed = url.pathname.split('/storage/v1/object/sign/')[1]
  if (signed !== undefined)
    return jsonResponse({ signedURL: `/object/sign/${signed}?token=t` })
  const target = url.pathname.split('/rest/v1/')[1]
  if (target === undefined) return jsonResponse({ message: 'not found' }, 404)
  if (target.startsWith('rpc/'))
    return jsonResponse(tables[`rpc:${target.slice(4)}`] ?? [])
  if (request.method === 'GET')
    return jsonResponse(
      filterByEquality(tables[target] ?? [], url.searchParams),
    )
  if (denyWrites) return jsonResponse({ message: 'denied' }, 403)
  writes.push({
    table: target,
    body: JSON.parse(String(request.body)) as unknown,
    keepalive: request.keepalive,
  })
  return new Response(null, { status: 201 })
}
