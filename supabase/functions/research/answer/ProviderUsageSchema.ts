import { z } from 'zod'

export const ProviderUsageSchema = z
  .object({
    prompt_tokens: z.number().int().nonnegative(),
    completion_tokens: z.number().int().nonnegative(),
    total_tokens: z.number().int().nonnegative(),
  })
  .refine(
    (usage) =>
      usage.total_tokens === usage.prompt_tokens + usage.completion_tokens,
  )
