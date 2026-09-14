import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import type { QuotaBucket } from './QuotaBucket.ts'

/**
 * Quota state is local to this limiter instance, not shared across processes.
 * At capacity, reject new principals instead of evicting live buckets and letting
 * an existing principal reset its allowance. Call only after authentication.
 */
export function createLimiter(config: FacadeConfig) {
  const buckets = new Map<string, QuotaBucket>()
  return (key: string, headers: Headers): void => {
    const now = config.now()
    for (const [id, bucket] of buckets)
      if (bucket.resetsAt <= now) buckets.delete(id)
    let bucket = buckets.get(key)
    if (!bucket) {
      if (buckets.size >= config.maxPrincipals)
        throw new FacadeError(
          503,
          'limiter_capacity',
          'Quota tracking is at capacity.',
          true,
        )
      bucket = { used: 0, resetsAt: now + config.windowSeconds * 1000 }
      buckets.set(key, bucket)
    }
    const seconds = Math.max(1, Math.ceil((bucket.resetsAt - now) / 1000))
    const denied = bucket.used >= config.limit
    if (!denied) bucket.used += 1
    headers.set(
      'ratelimit-policy',
      `"principal";q=${String(config.limit)};w=${String(config.windowSeconds)}`,
    )
    headers.set(
      'ratelimit',
      `"principal";r=${String(Math.max(0, config.limit - bucket.used))};t=${String(seconds)}`,
    )
    if (denied) {
      headers.set('retry-after', String(seconds))
      throw new FacadeError(
        429,
        'rate_limited',
        'The facade request rate is exhausted.',
        true,
      )
    }
  }
}
