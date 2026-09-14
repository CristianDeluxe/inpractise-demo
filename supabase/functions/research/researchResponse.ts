import { jsonResponse } from '../_shared/http/jsonResponse.ts'

/** Scope is taken from the same authenticated principal that performed the read. */
export function researchResponse(body: unknown, orgId: string): Response {
  const response = jsonResponse(body, 200)
  response.headers.set('x-research-org-id', orgId)
  return response
}
