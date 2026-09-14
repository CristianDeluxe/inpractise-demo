import { FacadeError } from './FacadeError.ts'

export function nodeRequestUrl(target: string): URL {
  try {
    return new URL(target, 'http://localhost')
  } catch {
    throw new FacadeError(400, 'invalid_request', 'Malformed request target.')
  }
}
