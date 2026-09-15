import { compareRelationLabel } from './compareRelationLabel'
import type { CompareRelationsViewProps } from './CompareRelationsViewProps'
import { findClaimText } from './findClaimText'

/** Every relation names two claims the parser already proved were published
 *  on their own side, so a row is only ever a lookup, never a fresh check. */
export function CompareRelationsView({
  relations,
  sides,
}: CompareRelationsViewProps) {
  return (
    <section
      aria-label="Cross-reference relations"
      className="mt-8 border-t border-border pt-6"
    >
      <h3 className="font-sans text-lg">How the two sides relate</h3>
      <ul className="mt-4 space-y-4">
        {relations.map((relation) => (
          <li
            key={`${relation.interviewClaimId}:${relation.filingClaimId}`}
            className="grid gap-2 rounded-lg border border-border bg-card p-4 text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center"
          >
            <p>
              {findClaimText(
                sides.interviews.claims,
                relation.interviewClaimId,
              )}
            </p>
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-primary">
              {compareRelationLabel(relation.relation)}
            </p>
            <p>{findClaimText(sides.filings.claims, relation.filingClaimId)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
