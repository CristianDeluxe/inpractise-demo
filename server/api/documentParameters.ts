import { FacadeError } from './FacadeError.ts'
import { viewAsParameters } from './viewAsParameters.ts'

export function documentParameters(params: URLSearchParams) {
  const entries = [...params.entries()]
  if (new Set(entries.map(([key]) => key)).size !== entries.length)
    throw new FacadeError(422, 'invalid_request', 'Duplicate query parameters.')
  return {
    ...Object.fromEntries(entries),
    ...viewAsParameters(params),
    ...(params.has('pageSize')
      ? { pageSize: Number(params.get('pageSize')) }
      : {}),
  }
}
