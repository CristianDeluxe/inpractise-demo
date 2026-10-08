import { useRemoteReview } from '../hooks/useRemoteReview'
import { buildReport } from '../review/buildReport'
import { collectCorrectedTerms } from '../review/collectCorrectedTerms'
import { listEdits } from '../review/listEdits'
import { toDecisionMap } from '../review/toDecisionMap'
import { transcriptDisclosure } from '../review/transcriptDisclosure'
import { DisclosureNotice } from './DisclosureNotice'
import { ReportAppendix } from './ReportAppendix'
import { ReportBody } from './ReportBody'
import { ReportMetrics } from './ReportMetrics'
import { ReportToolbar } from './ReportToolbar'
import type { ReportViewProps } from './ReportViewProps'

export function ReportView({ bundle }: ReportViewProps) {
  const { transcript, correction } = bundle
  const { source } = transcript
  const decisions = toDecisionMap(useRemoteReview(transcript.id, bundle.review))
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8 print:max-w-none print:bg-white print:p-0 print:text-black"
    >
      <ReportToolbar id={transcript.id} />
      <article className="mt-10">
        <p className="eyebrow text-muted-foreground print:text-black">
          Transcript report
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl">{source.title}</h1>
        <p className="meta-text mt-3 print:text-black">
          {source.channel} / {source.uploadDate} /{' '}
          <a
            href={source.url}
            className="break-all underline"
            rel="noreferrer noopener"
          >
            {source.url}
          </a>
        </p>
        <DisclosureNotice
          text={transcriptDisclosure(correction?.model ?? null)}
        />
        <ReportMetrics
          transcript={transcript}
          correction={correction}
          decisions={decisions}
        />
        <ReportBody
          paragraphs={buildReport(transcript, correction, decisions)}
        />
        <ReportAppendix
          terms={collectCorrectedTerms(listEdits(correction), decisions)}
        />
      </article>
    </main>
  )
}
