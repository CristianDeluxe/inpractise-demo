import type { CitationSource } from '../citations/CitationSource.ts'
import type { Comparison } from './Comparison.ts'
import { parseComparison } from './parseComparison.ts'
import { requestComparison } from './requestComparison.ts'

/** Generates one cross-reference and validates it against its schema. */
export async function generateComparison(
  topic: string,
  sides: {
    interviews: readonly CitationSource[]
    filings: readonly CitationSource[]
  },
  onUsage: (usage: unknown) => Promise<void>,
): Promise<Comparison> {
  return parseComparison(await requestComparison(topic, sides, onUsage))
}
