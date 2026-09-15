import { writeFileSync } from 'node:fs'
import { format, resolveConfig } from 'prettier'
import { commitDateLabel } from './commitDateLabel.mjs'
import { countTrackedFiles } from './countTrackedFiles.mjs'
import { groupCommitsByHalfDay } from './groupCommitsByHalfDay.mjs'
import { readCommitLog } from './readCommitLog.mjs'
import { renderBuildStats } from './renderBuildStats.mjs'

// Reads the history once, writes src/public/buildStats.ts through the
// repository's prettier configuration, and returns the one-line summary.
export async function writeBuildStats() {
  const commits = readCommitLog()
  const first = commits[0]
  const last = commits.at(-1)
  if (!first || !last) throw new Error('No commits to describe')
  const halfDays = groupCommitsByHalfDay(commits)
  const stats = {
    head: { hash: last.hash, date: last.date },
    firstCommitAt: commitDateLabel(first.date),
    lastCommitAt: commitDateLabel(last.date),
    elapsedHours: Math.round(
      (Date.parse(last.date) - Date.parse(first.date)) / 3_600_000,
    ),
    calendarDays: new Set(halfDays.map((halfDay) => halfDay.key.slice(0, 10)))
      .size,
    commitCount: commits.length,
    files: countTrackedFiles(),
    halfDays,
  }
  const options = await resolveConfig('src/public/buildStats.ts')
  writeFileSync(
    'src/public/buildStats.ts',
    await format(renderBuildStats(stats), {
      ...options,
      filepath: 'src/public/buildStats.ts',
    }),
  )
  return `src/public/buildStats.ts: ${stats.commitCount} commits, ${halfDays.length} half-days, head ${stats.head.hash}`
}
