import { z } from 'zod'
import type { OperationName } from './OperationName.ts'
import type { operations } from './operations.ts'

export function openApiParameters(
  name: OperationName,
  operation: (typeof operations)[OperationName],
) {
  const fields = Object.entries<z.ZodType>(operation.input.shape).map(
    ([key, schema]) => ({
      name: key,
      in: name === 'passage' && key !== 'viewAs' ? 'path' : 'query',
      required: !schema.safeParse(undefined).success,
      ...(key === 'viewAs'
        ? {
            content: { 'application/json': { schema: z.toJSONSchema(schema) } },
          }
        : { schema: z.toJSONSchema(schema) }),
    }),
  )
  return [
    {
      name: 'X-Request-Id',
      in: 'header',
      required: false,
      schema: { type: 'string', pattern: '^[A-Za-z0-9._-]{1,128}$' },
    },
    ...(operation.method === 'GET' ? fields : []),
    ...(name === 'passage'
      ? [
          {
            name: 'If-None-Match',
            in: 'header',
            required: false,
            schema: { type: 'string' },
          },
        ]
      : []),
  ]
}
