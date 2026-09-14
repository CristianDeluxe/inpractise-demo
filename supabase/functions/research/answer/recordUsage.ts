import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import { ProviderUsageSchema } from './ProviderUsageSchema.ts'

/**
 * Missing, malformed or inconsistent provider totals leave usage unknown.
 * Do not substitute zero: the request was already debited, and lack of valid
 * usage metadata does not establish that generation consumed no tokens.
 */
export async function recordUsage(
  principal: Principal,
  request: string,
  usage: unknown,
): Promise<void> {
  const parsed = ProviderUsageSchema.safeParse(usage)
  if (!parsed.success) return
  const { error } = await principal.client.rpc('record_request_usage', {
    request,
    prompt: parsed.data.prompt_tokens,
    completion: parsed.data.completion_tokens,
    total: parsed.data.total_tokens,
  })
  if (error)
    throw new ApiError('dependency_failure', 'Usage recording failed', true)
}
