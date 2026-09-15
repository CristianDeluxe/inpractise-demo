import { buildSourceLinks } from './buildSourceLinks'
import { gateContent } from './gateContent'

export function BuildGates() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="page-shell py-16">
        <h2>The gates every change passes</h2>
        <p className="prose-measure mt-5 text-muted-foreground">
          GitHub Actions runs <code>pnpm check:ci</code> on every push; the full{' '}
          <code>pnpm verify</code> adds the credentialed suites, and the
          evaluation gate and secret scan run before a release. None of them can
          be satisfied with a suppression. The exact versions and results are in{' '}
          <a
            className="hover-underline text-foreground"
            href={buildSourceLinks.baseline}
          >
            the baseline record
          </a>{' '}
          and{' '}
          <a
            className="hover-underline text-foreground"
            href={buildSourceLinks.evals}
          >
            the evaluation notes
          </a>
          .
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {gateContent.map((gate) => (
            <article
              key={gate.name}
              className="border border-border bg-card p-6"
            >
              <h3 className="font-sans text-base font-semibold">{gate.name}</h3>
              <p className="mt-2 font-mono text-sm text-primary">
                {gate.command}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {gate.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
