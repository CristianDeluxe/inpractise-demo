import type { OperationName } from './OperationName.ts'
import { operations } from './operations.ts'
import { setOperationQuery } from './setOperationQuery.ts'

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
  setOperationQuery(url, name, input)
  return url
}
