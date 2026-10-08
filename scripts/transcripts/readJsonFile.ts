import { readFileSync } from 'node:fs'
import type { z } from 'zod'

export function readJsonFile<T>(path: string, schema: z.ZodType<T>): T {
  return schema.parse(JSON.parse(readFileSync(path, 'utf8')))
}
