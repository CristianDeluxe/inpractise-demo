import { FacadeError } from './FacadeError.ts'

export function viewAsParameters(params: URLSearchParams) {
  const values = params.getAll('viewAs')
  if (!values.length) return {}
  if (values.length !== 1)
    throw new FacadeError(422, 'invalid_request', 'Duplicate viewing mode.')
  try {
    const viewAs: unknown = JSON.parse(values[0] ?? '')
    return { viewAs }
  } catch {
    throw new FacadeError(422, 'invalid_request', 'Viewing mode was not JSON.')
  }
}
