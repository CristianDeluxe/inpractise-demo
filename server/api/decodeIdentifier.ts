import { FacadeError } from './FacadeError.ts'

export function decodeIdentifier(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    throw new FacadeError(422, 'invalid_request', 'Malformed path encoding.')
  }
}
