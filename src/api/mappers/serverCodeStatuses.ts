/** The status each backend error code is served with, mirrored for frames
 * that arrive after the headers and therefore carry no status of their own. */
export const serverCodeStatuses: Readonly<Record<string, number>> = {
  unauthenticated: 401,
  forbidden: 403,
  not_found: 404,
  invalid_request: 422,
  allowance_exhausted: 429,
  invalid_model_answer: 502,
  dependency_failure: 503,
}
