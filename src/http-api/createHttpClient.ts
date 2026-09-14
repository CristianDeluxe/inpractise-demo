import type { HttpClientOptions } from './HttpClientOptions.ts'
import type { HttpRequestOptions } from './HttpRequestOptions.ts'
import type { OperationInput } from './OperationInput.ts'
import type { OperationName } from './OperationName.ts'
import { operations } from './operations.ts'
import { operationUrl } from './operationUrl.ts'
import { parseHttpResponse } from './parseHttpResponse.ts'

export function createHttpClient(options: HttpClientOptions) {
  return async <K extends OperationName>(
    name: K,
    input: OperationInput<K>,
    requestOptions: HttpRequestOptions = {},
  ) => {
    const operation = operations[name]
    const parsed = operation.input.parse(input)
    const headers = new Headers()
    const token = await options.getAccessToken()
    if (token) headers.set('authorization', `Bearer ${token}`)
    if (requestOptions.requestId)
      headers.set('x-request-id', requestOptions.requestId)
    if (requestOptions.etag) headers.set('if-none-match', requestOptions.etag)
    if (operation.method === 'POST')
      headers.set('content-type', 'application/json')
    const response = await (options.fetch ?? globalThis.fetch)(
      operationUrl(options.baseUrl, name, parsed),
      {
        method: operation.method,
        headers,
        ...(requestOptions.signal ? { signal: requestOptions.signal } : {}),
        ...(operation.method === 'POST'
          ? { body: JSON.stringify(parsed) }
          : {}),
        redirect: 'error',
        cache: 'no-store',
      },
    )
    return parseHttpResponse(response, name, parsed)
  }
}
