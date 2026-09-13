import { classifyFailure } from '../scripts/db/classifyFailure.ts'

/**
 * Recall at ten is measured before context selection, so a retrieval miss and
 * a selection miss stay distinguishable. Gold ids are alternatives: one
 * acceptable passage is enough, and a refusal case has nothing to recall.
 */
export function diagnoseRetrieval(
  goldKeys: readonly string[],
  candidateAt10: readonly string[],
  selectedIds: readonly string[],
) {
  if (!goldKeys.length)
    return { diagnosis: 'pass' as const, recallAt10: true, inContext: true }
  const recalled = goldKeys.find((key) => candidateAt10.includes(key))
  return {
    diagnosis: classifyFailure({
      goldIds: [recalled ?? goldKeys[0] ?? ''],
      candidateIds: [...candidateAt10],
      contextIds: [...selectedIds],
    }),
    recallAt10: recalled !== undefined,
    inContext: goldKeys.some((key) => selectedIds.includes(key)),
  }
}
