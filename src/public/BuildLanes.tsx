import { buildSourceLinks } from './buildSourceLinks'
import { laneContent } from './laneContent'

export function BuildLanes() {
  return (
    <section className="page-shell py-16">
      <h2>Who owned what</h2>
      <p className="prose-measure mt-5 text-muted-foreground">
        The plan gives shared files one owner and lets two sessions share a
        checkout because their paths do not overlap. The lanes below are{' '}
        <a
          className="hover-underline text-foreground"
          href={buildSourceLinks.ownership}
        >
          its section 4.4
        </a>
        , not a reconstruction. The commit log carries one human author and does
        not attribute commits to a lane; the later slices under{' '}
        <a
          className="hover-underline text-foreground"
          href={buildSourceLinks.slices}
        >
          docs/superpowers
        </a>{' '}
        and the{' '}
        <a
          className="hover-underline text-foreground"
          href={buildSourceLinks.decisions}
        >
          decision records
        </a>{' '}
        are how the work was steered after the first day.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {laneContent.map((lane) => (
          <article key={lane.name} className="rule-top pt-5">
            <h3 className="font-sans text-base font-semibold">{lane.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{lane.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
