import { BuildCorrections } from './BuildCorrections'
import { BuildCuts } from './BuildCuts'
import { BuildGates } from './BuildGates'
import { BuildLanes } from './BuildLanes'
import { buildSourceLinks } from './buildSourceLinks'
import { BuildTimeline } from './BuildTimeline'

export function BuiltArticle() {
  return (
    <main id="main-content">
      <section className="ink-panel">
        <div className="page-shell py-20">
          <p className="eyebrow text-brass">Method</p>
          <h1 className="display-hero mt-4 max-w-3xl">Built with agents</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Claude Code and Codex wrote the code in this repository from a plan
            that gave each of them its own files, while a person chose the
            scope, held the credentials and approved every deployment. The
            prompts did not keep it honest; the gates did: nothing stayed unless
            the type-check, the architectural lint, the unit, Edge and SQL
            authorization suites, the evaluation gate and the secret scan all
            passed.
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Sources:{' '}
            <a
              className="hover-underline text-ink-foreground"
              href={buildSourceLinks.plan}
            >
              the execution plan
            </a>
            ,{' '}
            <a
              className="hover-underline text-ink-foreground"
              href={buildSourceLinks.commits}
            >
              the commit log
            </a>{' '}
            and{' '}
            <a
              className="hover-underline text-ink-foreground"
              href={buildSourceLinks.workLog}
            >
              the work log
            </a>
            . Nothing here describes In Practise systems or content.
          </p>
        </div>
      </section>
      <BuildTimeline />
      <BuildGates />
      <BuildLanes />
      <BuildCuts />
      <BuildCorrections />
    </main>
  )
}
