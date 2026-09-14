import { isNotModified } from './isNotModified.ts'
import { jsonResponse } from './jsonResponse.ts'
import type { OperationContext } from './OperationContext.ts'
import { passageEtag } from './passageEtag.ts'

/**
 * Call only after the backend read and evidence validation, even for a 304.
 * Without scope from that read, omit the ETag and return the full response;
 * using an earlier identity check could reuse evidence across organizations.
 */
export function evidenceResponse(
  data: unknown,
  passage: boolean,
  context: OperationContext,
  readScope: string | null,
): Response {
  const { headers, request } = context
  if (passage && readScope) {
    const etag = passageEtag(data, readScope)
    headers.set('etag', etag)
    headers.set('cache-control', 'private, no-cache')
    headers.set('vary', 'Authorization')
    if (isNotModified(request.headers.get('if-none-match'), etag))
      return new Response(null, { status: 304, headers })
  }
  return jsonResponse(data, headers)
}
