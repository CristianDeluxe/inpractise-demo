import { parseModelJson } from '../answer/parseModelJson.ts'
import type { Comparison } from './Comparison.ts'
import { ComparisonSchema } from './ComparisonSchema.ts'

/** A malformed cross-reference is a model failure, never a rendered verdict. */
export function parseComparison(content: string): Comparison {
  return parseModelJson(ComparisonSchema, content)
}
