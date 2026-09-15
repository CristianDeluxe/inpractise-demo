import { buildSourceLinks } from './buildSourceLinks'
import { correctionContent } from './correctionContent'

export function BuildCorrections() {
  return (
    <section className="page-shell py-16">
      <h2>What the agents got wrong</h2>
      <p className="prose-measure mt-5 text-muted-foreground">
        Six corrections from{' '}
        <a
          className="hover-underline text-foreground"
          href={buildSourceLinks.workLog}
        >
          the work log
        </a>
        , each recorded with the evidence that closed it. Four were found by a
        live request against the deployment or the browser, two by a gate; none
        was found by reading.
      </p>
      <ol className="mt-8 grid gap-6 md:grid-cols-2">
        {correctionContent.map((item, index) => (
          <li key={item.title} className="border border-border bg-card p-6">
            <p className="eyebrow text-muted-foreground">{index + 1}</p>
            <h3 className="mt-2 font-sans text-base font-semibold">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
