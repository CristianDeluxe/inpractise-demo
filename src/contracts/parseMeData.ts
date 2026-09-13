import { z } from 'zod'

export function parseMeData(input: unknown) {
  return z
    .strictObject({
      orgId: z.string().min(1),
      role: z.enum(['member', 'reviewer']),
      premium: z.boolean(),
    })
    .parse(input)
}
