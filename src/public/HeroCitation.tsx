import { ArrowRight } from '@/components/ArrowRight'
import { SourceLabel } from '@/components/SourceLabel'
import { Link } from '@tanstack/react-router'
import type { HeroCitationProps } from './HeroCitationProps'

export function HeroCitation({ answer }: HeroCitationProps) {
  return (
    <figure className="mt-5 border-t border-border pt-4">
      <SourceLabel origin="public" kind="public_interview" />
      <blockquote className="source-text mt-3 border-l-2 border-primary pl-4 text-[16px]">
        “…{answer.quote}…”
      </blockquote>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        {answer.speaker}, {answer.speakerRole}
        <br />
        {answer.podcast}
        <br />
        Interview: {answer.interviewDate} · at {answer.section} · excerpt{' '}
        {answer.passageId}
      </figcaption>
      <Link
        to={answer.readerPath}
        className="group hover-underline mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"
        aria-label={`Open the transcript excerpt ${answer.passageId}`}
      >
        Open the transcript excerpt <ArrowRight />
      </Link>
    </figure>
  )
}
