import { z } from 'zod'
import type { OperationName } from './OperationName.ts'
import type { operations } from './operations.ts'
import { passageHeaders } from './passageHeaders.ts'
import { problemResponses } from './problemResponses.ts'
import { responseHeaders } from './responseHeaders.ts'

export function openApiResponses(
  name: OperationName,
  operation: (typeof operations)[OperationName],
) {
  const headers = {
    ...responseHeaders,
    ...(name === 'passage' ? passageHeaders : {}),
  }
  return {
    '200': {
      description: operation.description,
      headers,
      content: {
        'application/json': { schema: z.toJSONSchema(operation.output) },
      },
    },
    ...(name === 'passage'
      ? {
          '304': {
            description:
              'No body; current backend authorization succeeded, read-owned scope was supplied, and validator matched.',
            headers,
          },
        }
      : {}),
    ...problemResponses,
    default: {
      description: 'Other backend errors preserve their HTTP status.',
      content: problemResponses['503']?.content,
    },
  }
}
