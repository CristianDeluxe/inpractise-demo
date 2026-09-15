import type { z } from 'zod'
import type { DataParser } from './DataParser.ts'

/** What a streamed action validates: each stage frame, and the terminal data. */
export type StreamContract<T extends Record<string, unknown>, S> = {
  stageSchema: z.ZodType<S>
  parseData: DataParser<T>
}
