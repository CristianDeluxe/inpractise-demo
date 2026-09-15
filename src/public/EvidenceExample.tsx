import { Link } from '@tanstack/react-router'
import { EvidenceSteps } from './EvidenceSteps'
import { SampleCard } from './SampleCard'
import { sampleSources } from './sampleSources'

export function EvidenceExample() {
  return (
    <section id="evidence" className="page-shell mb-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted-foreground">
            Curated example — not a live answer
          </p>
          <h2 className="mt-4 italic">Audit the source.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Complex installations can require rebuilding integrations. One small
            deployment moved in six weeks. These accounts do not establish a
            universal switching cost.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Northstar Workflow and both speakers are fictional. Open each
            passage to read the scope and limitations.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            The demo corpus also includes public SEC filings from Microsoft and
            Costco, and fictional interviews about Northstar Workflow, Harbor
            Components and Meridian Payments.
          </p>
          <EvidenceSteps />
          <Link to="/app" className="action mt-8">
            Ask your own question
          </Link>
        </div>
        <div className="lift-card border border-border bg-card p-6 md:p-8 lg:col-span-7">
          <p className="eyebrow mb-4 text-muted-foreground">
            Two accounts. Different contexts.
          </p>
          {sampleSources.map((source) => (
            <SampleCard key={source.documentId} source={source} />
          ))}
        </div>
      </div>
    </section>
  )
}
