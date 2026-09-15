import { ArrowRight } from '@/components/ArrowRight'
import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { SourceLabel } from '@/components/SourceLabel'
import { Link } from '@tanstack/react-router'
import type { HeroCitationProps } from './HeroCitationProps'

export function HeroCitation({ citation }: HeroCitationProps) {
  return (
    <figure className="mt-5 border-t border-border pt-4">
      <SourceLabel origin={citation.origin} />
      <blockquote className="source-text mt-3 border-l-2 border-primary pl-4 text-[16px]">
        “{citation.quote}”
      </blockquote>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        {citation.speaker}, {citation.speakerRole}
        <br />
        Interview: {citation.interviewDate} · Published:{' '}
        {formatPublishedDate(citation.publishedAt)}
      </figcaption>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px] text-muted-foreground">
        <dt className="uppercase tracking-[0.12em]">document</dt>
        <dd className="text-foreground">{citation.documentId}</dd>
        <dt className="uppercase tracking-[0.12em]">revision</dt>
        <dd className="break-all text-foreground">{citation.revisionId}</dd>
        <dt className="uppercase tracking-[0.12em]">passage</dt>
        <dd className="text-foreground">{citation.passageId}</dd>
      </dl>
      <Link
        to={citation.readerPath}
        className="group hover-underline mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"
        aria-label={`Open exact passage ${citation.citationId}`}
      >
        Open exact passage <ArrowRight />
      </Link>
    </figure>
  )
}
