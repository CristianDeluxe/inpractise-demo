import type { OperationName } from './OperationName.ts'
import { operations } from './operations.ts'

export function setOperationQuery(
  url: URL,
  name: OperationName,
  input: Record<string, unknown>,
) {
  if (name === 'documents')
    for (const [key, value] of Object.entries(input))
      if (typeof value === 'string' || typeof value === 'number')
        url.searchParams.set(key, String(value))
  if (operations[name].method === 'GET' && input['viewAs'] !== undefined)
    url.searchParams.set('viewAs', JSON.stringify(input['viewAs']))
}
