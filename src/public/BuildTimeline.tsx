import { BuildHalfDays } from './BuildHalfDays'
import { BuildMetrics } from './BuildMetrics'
import { buildSourceLinks } from './buildSourceLinks'
import { buildStats } from './buildStats'

export function BuildTimeline() {
  return (
    <section className="page-shell py-16">
      <h2>Timeline from the commit log</h2>
      <p className="prose-measure mt-5 text-muted-foreground">
        The plan budgeted twenty-four elapsed hours, six of them asleep, after
        the research and planning had already been done. Git records{' '}
        {buildStats.commitCount} commits between {buildStats.firstCommitAt} and{' '}
        {buildStats.lastCommitAt}: {buildStats.elapsedHours} elapsed hours over{' '}
        {buildStats.calendarDays} calendar days. The figures are written by{' '}
        <a
          className="hover-underline text-foreground"
          href={buildSourceLinks.collector}
        >
          a script that reads the history
        </a>{' '}
        and are committed; this page never reads git.
      </p>
      <BuildMetrics />
      <BuildHalfDays />
    </section>
  )
}
