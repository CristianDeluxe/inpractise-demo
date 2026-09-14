import type { OperationName } from './OperationName.ts'
import { operations } from './operations.ts'

export function operationUrl(
  baseUrl: string,
  name: OperationName,
  input: Record<string, unknown>,
): URL {
  let path: string = operations[name].path
  if (name === 'passage')
    for (const [key, value] of Object.entries(input)) {
      if (value === '.' || value === '..')
        throw new Error('Invalid path identifier')
      path = path.replace(`{${key}}`, encodeURIComponent(String(value)))
    }
  const url = new URL(path, baseUrl)
  if (name === 'documents')
    for (const [key, value] of Object.entries(input))
      if (typeof value === 'string' || typeof value === 'number')
        url.searchParams.set(key, String(value))
  return url
}
