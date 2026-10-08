import { z } from 'zod'
import { CorrectionResponseSchema } from './CorrectionResponseSchema.ts'

/** JSON Schema derived from the zod contract, without the $schema keyword. */
export function correctionJsonSchema(): Record<string, unknown> {
  const { $schema: _draft, ...schema } = z.toJSONSchema(
    CorrectionResponseSchema,
  )
  return schema
}
