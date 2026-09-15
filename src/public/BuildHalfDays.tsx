import { buildStats } from './buildStats'
import { buildTimelineThemes } from './buildTimelineThemes'

export function BuildHalfDays() {
  return (
    <ol className="mt-10 divide-y divide-border border-y border-border">
      {buildStats.halfDays.map((halfDay) => (
        <li
          key={halfDay.key}
          className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]"
        >
          <div>
            <h3 className="font-sans text-base font-semibold">
              {halfDay.label}
            </h3>
            <p className="meta-text mt-1">
              {halfDay.commitCount} commits, {halfDay.firstAt} to{' '}
              {halfDay.lastAt}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {buildTimelineThemes[halfDay.key]}
            </p>
            <p className="meta-text mt-2">
              Scopes: {halfDay.scopes.join(', ')}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
