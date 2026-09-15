import { buildSourceLinks } from './buildSourceLinks'
import { cutContent } from './cutContent'

export function BuildCuts() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="page-shell py-16">
        <h2>Cut on purpose</h2>
        <p className="prose-measure mt-5 text-muted-foreground">
          The earlier specifications described a platform. The plan removed most
          of it so that one workflow could be finished and checked, and it says
          what a cut leaves observable instead of building a convincing fake
          screen. The full table is{' '}
          <a
            className="hover-underline text-foreground"
            href={buildSourceLinks.disposition}
          >
            section 2 of the execution plan
          </a>
          .
        </p>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {cutContent.map((item) => (
            <div
              key={item.cut}
              className="grid gap-2 py-5 md:grid-cols-2 md:gap-8"
            >
              <dt className="font-medium">{item.cut}</dt>
              <dd className="text-sm text-muted-foreground">{item.kept}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
