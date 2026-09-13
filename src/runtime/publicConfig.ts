import { z } from 'zod'

export const publicConfig = z.strictObject({
  url: z.url(),
  key: z.string().startsWith('sb_publishable_'),
})
