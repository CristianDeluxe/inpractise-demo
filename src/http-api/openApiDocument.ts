import { openApiOperation } from './openApiOperation.ts'
import type { OperationName } from './OperationName.ts'
import { operations } from './operations.ts'
import { problemResponses } from './problemResponses.ts'
import { responseHeaders } from './responseHeaders.ts'

export const openApiDocument = {
  openapi: '3.1.1',
  info: {
    title: 'In Practise Demo HTTP API',
    version: '1.0.0',
    description:
      'Independent demo: public filings and synthetic interviews only. No In Practise private research. Caller-token facade; reviewer diagnostics excluded. Single-process quotas.',
  },
  servers: [{ url: '/' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
  paths: {
    ...Object.fromEntries(
      Object.entries(operations).map(([name, operation]) => [
        operation.path,
        {
          [operation.method.toLowerCase()]: openApiOperation(
            name as OperationName,
            operation,
          ),
        },
      ]),
    ),
    '/api/v1/openapi.json': {
      get: {
        operationId: 'openapi',
        description: 'Generated OpenAPI 3.1 contract; public.',
        security: [],
        responses: {
          '200': {
            description: 'OpenAPI document',
            headers: responseHeaders,
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          ...problemResponses,
        },
      },
    },
  },
}
