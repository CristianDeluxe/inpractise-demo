import { ApiError } from './ApiError.ts'
import type { ClientOptions } from './ClientOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'

export function createResearchClient(options: ClientOptions): ResearchClient {
  let url: URL
  try {
    url = new URL(options.baseUrl)
  } catch {
    throw new ApiError('bad_input', 'The Supabase base URL is invalid.')
  }
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new ApiError(
      'bad_input',
      'Use an HTTP(S) Supabase origin without credentials, query, or path.',
    )
  }
  if (!options.publishableKey.trim())
    throw new ApiError('bad_input', 'A Supabase publishable key is required.')
  return {
    endpoint: new URL('/functions/v1/research', url).href,
    publishableKey: options.publishableKey,
    getAccessToken: options.getAccessToken,
    fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
    sequence: 0,
  }
}
