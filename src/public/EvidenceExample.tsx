import { Link } from '@tanstack/react-router'
import { EvidenceSteps } from './EvidenceSteps'
import { NotEstablishedExample } from './NotEstablishedExample'

export function EvidenceExample() {
  return (
    <section id="evidence" className="page-shell mb-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted-foreground">What you can check</p>
          <h2 className="mt-4 italic">Audit the source.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Each quote names the speaker, the podcast, the interview date and
            the excerpt it was taken from, and the link opens that excerpt in
            the transcript.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            The sources are the public In Good Company podcast episodes of
            Norges Bank Investment Management with the CEOs of Roche and
            Novartis. They are automatic transcripts with inferred speaker
            labels, a small sample and not In Practise research.
          </p>
          <EvidenceSteps />
          <Link to="/app" className="action mt-8">
            Ask your own question
          </Link>
        </div>
        <NotEstablishedExample />
      </div>
    </section>
  )
}
