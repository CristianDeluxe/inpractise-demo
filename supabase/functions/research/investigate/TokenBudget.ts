import { ApiError } from '../../_shared/http/ApiError.ts'
import { ProviderUsageSchema } from '../answer/ProviderUsageSchema.ts'

/**
 * The hard token bound across every provider call of one investigation. Each
 * completion's reported usage is added as it arrives; the next call is refused
 * once the bound is reached. Usage the provider did not report cannot be
 * counted, so the bound is enforced on what was reported, and the totals are
 * undefined until at least one call reported them: an unknown is never
 * recorded as zero.
 */
export class TokenBudget {
  readonly limit: number
  private prompt = 0
  private completion = 0
  private reported = false

  constructor(limit: number) {
    this.limit = limit
  }

  get used(): number {
    return this.prompt + this.completion
  }

  consume(usage: unknown) {
    const parsed = ProviderUsageSchema.safeParse(usage)
    if (!parsed.success) return this.totals()
    this.prompt += parsed.data.prompt_tokens
    this.completion += parsed.data.completion_tokens
    this.reported = true
    return this.totals()
  }

  canAfford(reserve: number): boolean {
    return this.used + reserve <= this.limit
  }

  assertAvailable(): void {
    if (this.used >= this.limit)
      throw new ApiError(
        'allowance_exhausted',
        'Investigation token budget exhausted',
      )
  }

  totals() {
    if (!this.reported) return undefined
    return {
      prompt_tokens: this.prompt,
      completion_tokens: this.completion,
      total_tokens: this.prompt + this.completion,
    }
  }
}
