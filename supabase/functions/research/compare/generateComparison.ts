import type { Comparison } from './Comparison.ts'
import type { ComparisonSources } from './ComparisonSources.ts'
import { parseComparison } from './parseComparison.ts'
import { requestComparison } from './requestComparison.ts'

/** Generates one cross-reference and validates it against its schema. */
export async function generateComparison(
  topic: string,
  sides: ComparisonSources,
  onUsage: (usage: unknown) => Promise<void>,
): Promise<Comparison> {
  return parseComparison(await requestComparison(topic, sides, onUsage))
}
