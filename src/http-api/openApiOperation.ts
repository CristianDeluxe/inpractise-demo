import { z } from 'zod'
import { openApiParameters } from './openApiParameters.ts'
import { openApiResponses } from './openApiResponses.ts'
import type { OperationName } from './OperationName.ts'
import type { operations } from './operations.ts'

export function openApiOperation(
  name: OperationName,
  operation: (typeof operations)[OperationName],
) {
  return {
    operationId: name,
    description: operation.description,
    security: name === 'health' ? [] : [{ bearerAuth: [] }],
    parameters: openApiParameters(name, operation),
    ...(operation.method === 'POST'
      ? {
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: z.toJSONSchema(operation.input) },
            },
          },
        }
      : {}),
    responses: openApiResponses(name, operation),
  }
}
