import { z } from 'zod'

/** Preserve frozen gold files while resolving retired controls to demo. */
export const GoldPersonaSchema = z
  .enum(['demo', 'basic', 'other', 'mcp', 'premium', 'reviewer'])
  .transform((name) =>
    name === 'premium' || name === 'reviewer' ? 'demo' : name,
  )
