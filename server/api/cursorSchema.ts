import { z } from 'zod'

export const cursorSchema = z.strictObject({
  after: z.string().min(1),
  company: z.string().nullable(),
  kind: z.string().nullable(),
})
