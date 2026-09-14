import type { OperationName } from '@/http-api/OperationName.ts'
import { operations } from '@/http-api/operations.ts'
import { decodeIdentifier } from './decodeIdentifier.ts'
import { FacadeError } from './FacadeError.ts'

export function matchOperation(request: Request) {
  const url = new URL(request.url)
  for (const [name, operation] of Object.entries(operations)) {
    const parts = url.pathname.split('/')
    const pattern = operation.path.split('/')
    if (
      parts.length !== pattern.length ||
      pattern.some(
        (part, index) => !part.startsWith('{') && part !== parts[index],
      )
    )
      continue
    if (operation.method !== request.method)
      throw new FacadeError(
        405,
        'method_not_allowed',
        `Use ${operation.method} for this endpoint.`,
        { allow: operation.method },
      )
    const path = Object.fromEntries(
      pattern.flatMap((part, index) =>
        part.startsWith('{')
          ? [[part.slice(1, -1), decodeIdentifier(parts[index] ?? '')]]
          : [],
      ),
    )
    return { name: name as OperationName, operation, path }
  }
  throw new FacadeError(404, 'not_found', 'No such API endpoint.')
}
