import { openApiDocument } from '@/http-api/openApiDocument.ts'
import { openApiOperation } from '@/http-api/openApiOperation.ts'
import { operations } from '@/http-api/operations.ts'
import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'

describe('OpenAPI runtime agreement', () => {
  it('fails when the checked-in contract differs from handler schemas', async () => {
    const checkedIn: unknown = JSON.parse(
      await readFile('docs/openapi.json', 'utf8'),
    )
    expect(checkedIn).toEqual(openApiDocument)
    expect(Object.keys(openApiDocument.paths)).toHaveLength(7)
  })
  it.each(Object.entries(operations))(
    'uses actual %s schemas for requests and responses',
    (name, operation) => {
      const spec = openApiOperation(name as keyof typeof operations, operation)
      expect(spec.responses['200'].content['application/json'].schema).toEqual(
        z.toJSONSchema(operation.output),
      )
      expect(spec.requestBody?.content['application/json'].schema).toEqual(
        operation.method === 'POST'
          ? z.toJSONSchema(operation.input)
          : undefined,
      )
      expect(spec.responses).toHaveProperty(
        '401.content.application/problem+json',
      )
    },
  )
})
