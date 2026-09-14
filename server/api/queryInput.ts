import { documentParameters } from './documentParameters.ts'
import { FacadeError } from './FacadeError.ts'
import type { matchOperation } from './matchOperation.ts'
import { viewAsParameters } from './viewAsParameters.ts'

export function queryInput(
  request: Request,
  route: ReturnType<typeof matchOperation>,
) {
  const params = new URL(request.url).searchParams
  if (route.name === 'documents') return documentParameters(params)
  if (route.name === 'me' || route.name === 'passage') {
    if ([...params.keys()].some((key) => key !== 'viewAs'))
      throw new FacadeError(
        422,
        'invalid_request',
        'Unexpected query parameters.',
      )
    return { ...route.path, ...viewAsParameters(params) }
  }
  if (params.size)
    throw new FacadeError(
      422,
      'invalid_request',
      'Unexpected query parameters.',
    )
  return route.path
}
