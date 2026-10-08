import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { CorrectedTerm } from './CorrectedTerm'
import type { DecisionMap } from './DecisionMap'
import { termCategories } from './termCategories'

/** Entity, term and number substitutions that were not rejected, grouped by from -> to. */
export function collectCorrectedTerms(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): CorrectedTerm[] {
  const grouped = new Map<string, CorrectedTerm>()
  for (const edit of edits) {
    if (!termCategories.has(edit.category)) continue
    if (decisions.get(edit.id) === 'rejected') continue
    const key = `${edit.from}\u0000${edit.to}`
    const known = grouped.get(key)
    grouped.set(key, {
      from: edit.from,
      to: edit.to,
      count: (known?.count ?? 0) + 1,
    })
  }
  return [...grouped.values()].sort((a, b) => b.count - a.count)
}
