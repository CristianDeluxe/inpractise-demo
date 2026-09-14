import { ClaimRow } from './ClaimRow'
import type { ConflictViewProps } from './ConflictViewProps'
import { conflictSides } from './conflictSides'

export function ConflictView({ claims, citations }: ConflictViewProps) {
  return (
    <div className="my-6 grid gap-5 md:grid-cols-2">
      {conflictSides(claims, citations).map((side) => (
        <section
          key={side.attribution}
          className="rounded-lg border border-border bg-card p-5"
        >
          <h4 className="font-sans text-base">{side.attribution}</h4>
          {side.interviewDate ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Interview: {side.interviewDate}
            </p>
          ) : null}
          <ul className="mt-4 space-y-5">
            {side.claims.map((claim) => (
              <ClaimRow
                key={claim.text}
                claim={claim}
                citations={[...citations]}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
