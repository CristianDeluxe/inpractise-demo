import { commitScope } from './commitScope.mjs'
import { halfDayKey } from './halfDayKey.mjs'
import { halfDayLabel } from './halfDayLabel.mjs'

// Scopes are kept to the five most frequent per half-day, as "name count"
// strings, so the generated file stays short enough for the size gate.
export function groupCommitsByHalfDay(commits) {
  const groups = new Map()
  for (const commit of commits) {
    const key = halfDayKey(commit.date)
    const group = groups.get(key) ?? {
      key,
      label: halfDayLabel(key),
      commitCount: 0,
      firstAt: commit.date.slice(11, 16),
      lastAt: commit.date.slice(11, 16),
      scopes: new Map(),
    }
    group.commitCount += 1
    group.lastAt = commit.date.slice(11, 16)
    const scope = commitScope(commit.subject)
    group.scopes.set(scope, (group.scopes.get(scope) ?? 0) + 1)
    groups.set(key, group)
  }
  return [...groups.values()].map((group) => ({
    ...group,
    scopes: [...group.scopes]
      .sort(([a, x], [b, y]) => y - x || a.localeCompare(b))
      .slice(0, 5)
      .map(([name, count]) => `${name} ${count}`),
  }))
}
